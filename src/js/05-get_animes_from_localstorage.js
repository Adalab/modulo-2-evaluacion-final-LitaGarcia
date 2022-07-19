'use strict';
const getLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem('favoritesAnimes'));
  if (localStorageData) {
    favoriteAnimeList = localStorageData;
    renderFavoriteAnimes();
  }
};

getLocalStorage();
