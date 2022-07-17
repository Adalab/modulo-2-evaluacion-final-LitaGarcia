'use strict';

const ul = document.querySelector('.js-ul');
const inputTitle = document.querySelector('.js-inputTitle');
const searchButton = document.querySelector('.js-searchButton');
const SERVER_URL = 'https://api.jikan.moe/v4/anime?limit=5&q=';
const defaultImg =
  'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';
const customizedDefaultImg =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
const ulFavs = document.querySelector('.js-ulFavs');

let animeList = [];
let favoriteAnimeList = [];

// Search Animes and render them

const createAnimeCardHtml = (animeTitle, animeId, imageUrl) => {
  let animeHtml = `<li><div class='js-card' id='${animeId}' style="cursor:pointer"><img src='${imageUrl}' alt='Portada del anime que has buscado' title='Anime Image'/>`;
  animeHtml += `<h2>${animeTitle}`;
  animeHtml += `</div></h2></li>`;
  return animeHtml;
};

const createAnimeHTML = (anime) => {
  let animeHtml = '';
  const animeImageUrl = anime.images.jpg.image_url;
  const isImageDefault = animeImageUrl.includes(defaultImg);
  if (isImageDefault) {
    animeHtml += createAnimeCardHtml(
      anime.title,
      anime.mal_id,
      customizedDefaultImg
    );
  } else {
    animeHtml += createAnimeCardHtml(anime.title, anime.mal_id, animeImageUrl);
  }

  return animeHtml;
};

const renderAnimes = () => {
  let globalHtml = '';
  animeList.forEach((anime) => (globalHtml += createAnimeHTML(anime)));
  ul.innerHTML = globalHtml;
};
// Select and render favorites
const renderFavoriteAnimes = () => {
  let globalHtml = '';
  favoriteAnimeList.forEach((anime) => (globalHtml += createAnimeHTML(anime)));
  ulFavs.innerHTML = globalHtml;
};

function addAnimeToFav(animeIdSelected) {
  const animeSelected = animeList.find(
    (anime) => animeIdSelected === anime.mal_id
  );
  if (!favoriteAnimeList.includes(animeSelected)) {
    favoriteAnimeList.push(animeSelected);
    renderFavoriteAnimes();
  }
}

// Add into LocalStorage

const addToLocalStorage = () => {
  localStorage.setItem('favoritesAnimes', JSON.stringify(favoriteAnimeList));
};

//END

const handlefavoriteClick = (event) => {
  const animeIdSelected = parseInt(event.currentTarget.id);
  addAnimeToFav(animeIdSelected);
  addToLocalStorage();
};

const addEventListenerToAnimeCards = () => {
  const animeCards = document.querySelectorAll('.js-card');
  animeCards.forEach((anime) =>
    anime.addEventListener('click', handlefavoriteClick)
  );
};
// END Select and render favorites

const getAnimeDataByTitle = (titleValue) => {
  fetch(`${SERVER_URL}${titleValue}`)
    .then((response) => response.json())
    .then((dataAnime) => {
      animeList = dataAnime.data;
      renderAnimes();
      addEventListenerToAnimeCards();
    });
};

const handleClick = (event) => {
  event.preventDefault();
  const titleValue = inputTitle.value;
  getAnimeDataByTitle(titleValue);
};

searchButton.addEventListener('click', handleClick);

//

// Get LS

const getLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem('favoritesAnimes'));
  if (localStorageData) {
    favoriteAnimeList = localStorageData;
    renderFavoriteAnimes();
  }
};

getLocalStorage();
