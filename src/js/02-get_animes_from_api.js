/* eslint-disable no-undef */
'use strict';

const getAnimeDataByTitle = (titleValue) => {
  fetch(`${SERVER_URL}${titleValue}`)
    .then((response) => response.json())
    .then((dataAnime) => {
      if (dataAnime.data.length === 0) {
        createNewElement();
      }
      animeList = dataAnime.data.map((anime) => {
        const animeImageUrl = anime.images.jpg.image_url;
        const isImageDefault = animeImageUrl.includes(defaultImg);
        if (isImageDefault) {
          anime.images.jpg.image_url = customizedDefaultImg;
        } else {
          anime.images.jpg.image_url = animeImageUrl;
        }
        return anime;
      });
      console.log(animeList);
      renderAnimes();
    });
};

const handleClickSearch = (event) => {
  event.preventDefault();
  console.log('holis');
  const titleValue = inputTitle.value;
  getAnimeDataByTitle(titleValue);
};

searchButton.addEventListener('click', handleClickSearch);
