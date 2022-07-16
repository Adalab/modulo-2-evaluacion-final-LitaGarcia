'use strict';

const ul = document.querySelector('.js-ul');
const inputTitle = document.querySelector('.js-inputTitle');
const searchButton = document.querySelector('.js-searchButton');
const SERVER_URL = 'https://api.jikan.moe/v4/anime?q=';
const defaultImg =
  'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';
const customizedDefaultImg =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
let animeList = [];

function createAnimeHTML(anime) {
  let animeHtml = '';
  const isImageDefault = anime.images.jpg.image_url.includes(defaultImg);
  if (isImageDefault) {
    animeHtml += `<li><div class='js-card'><img src='${customizedDefaultImg}' alt='Este anime no tiene portada'/>`;
  } else {
    animeHtml += `<li><div class='js-card'><img src='${anime.images.jpg.image_url}' alt='Portada del anime que has buscado' title='Image Anime'/>`;
  }
  animeHtml += `<h2>${anime.title}`;
  animeHtml += `</div></h2></li>`;
  return animeHtml;
}

const renderAnimes = () => {
  let globalHtml = '';
  for (const anime of animeList) {
    globalHtml += createAnimeHTML(anime);
  }
  ul.innerHTML = globalHtml;
};

const getAnimeDataByTitle = (titleValue) => {
  fetch(`${SERVER_URL}${titleValue}`)
    .then((response) => response.json())
    .then((dataAnime) => {
      animeList = dataAnime.data;
      renderAnimes();
    });
};

const handleClick = (event) => {
  event.preventDefault();
  const titleValue = inputTitle.value;
  getAnimeDataByTitle(titleValue);
};

searchButton.addEventListener('click', handleClick);
