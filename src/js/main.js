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
  animeHtml += `<h2 class='card'>${animeTitle}`;
  animeHtml += `</div></h2></li>`;
  return animeHtml;
};

const createAnimeFavCardHtml = (anime) => {
  const animeCardHtml = createAnimeCardHtml(
    anime.title,
    anime.mal_id,
    anime.images.jpg.image_url
  );
  const animeFavCard =
    animeCardHtml +
    `<button class="js-removeFavs main__button--remove">x</button>`;
  return animeFavCard;
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
  favoriteAnimeList.forEach((anime) => {
    globalHtml += createAnimeFavCardHtml(anime);
  });
  ulFavs.innerHTML = globalHtml;
};

// Add into LocalStorage

const addToLocalStorage = () => {
  localStorage.setItem('favoritesAnimes', JSON.stringify(favoriteAnimeList));
};

function addAnimeToFav(animeIdSelected) {
  const animeSelected = animeList.find(
    (anime) => animeIdSelected === anime.mal_id
  );
  const favoriteFound = favoriteAnimeList.findIndex(
    (favAnime) => favAnime.mal_id === animeSelected.mal_id
  );
  if (favoriteFound === -1) {
    favoriteAnimeList.push(animeSelected);
    addToLocalStorage();
    renderFavoriteAnimes();
  } else {
    favoriteAnimeList.splice(favoriteFound, 1);
    addToLocalStorage();
    renderFavoriteAnimes();
  }
}

//END

const handlefavoriteClick = (event) => {
  const animeIdSelected = parseInt(event.currentTarget.id);
  addAnimeToFav(animeIdSelected);
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

// Get LS

const getLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem('favoritesAnimes'));
  if (localStorageData) {
    favoriteAnimeList = localStorageData;
    renderFavoriteAnimes();
  }
};

getLocalStorage();

// ENTER key
const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchButton.click();
  }
};

inputTitle.addEventListener('keydown', handleKeyDown);

//clean Results
const resetButton = document.querySelector('.js-resetButton');
const handleClickReset = () => {
  animeList = [];
  renderAnimes();
};
resetButton.addEventListener('click', handleClickReset);

//clean OneAnimeFav

// const removeFavButton = document.querySelector('.js-removeFavs');

// const handleClickRemoveFav = () => {
//   addEventListenerToAnimeCards();
// };

// removeFavButton.addEventListener('click', handleClickRemoveFav);
