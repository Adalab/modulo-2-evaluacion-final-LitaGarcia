'use strict';

console.log('>> Ready :)');

const ul = document.querySelector('.js-ul');
let animeData = [];

const renderAnimeData = () => {
  let html = '';
  for (const anime of animeData) {
    html += `<li><article><img src='${anime.images.jpg.image_url}'/>`;
    html += `<h2>${anime.title}</h2>`;
    html += `</article></li>`;
    console.log(anime.images.jpg.image_url);
  }
  ul.innerHTML = html;
};

const getApi = () => {
  fetch('https://api.jikan.moe/v4/anime?q=naruto')
    .then((response) => response.json())
    .then((dataAnime) => {
      animeData = dataAnime.data;
      renderAnimeData();
    });
};

getApi();
