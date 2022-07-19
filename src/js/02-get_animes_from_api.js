'use strict';

const getAnimeDataByTitle = (titleValue) => {
  fetch(`${SERVER_URL}${titleValue}`)
    .then((response) => response.json())
    .then((dataAnime) => {
      if (dataAnime.data.length === 0) {
        createNewElement();
      }
      animeList = dataAnime.data;
      renderAnimes();
    });
};

const handleClickSearch = (event) => {
  event.preventDefault();
  const titleValue = inputTitle.value;
  getAnimeDataByTitle(titleValue);
};

searchButton.addEventListener('click', handleClickSearch);
