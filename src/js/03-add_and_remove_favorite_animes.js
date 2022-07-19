'use strict';

const handleClickResetFavs = (event) => {
  event.preventDefault();
  favoriteAnimeList = [];
  addToLocalStorage();
  renderFavoriteAnimes();
};

function handlefavoriteClick(event) {
  const animeIdSelected = parseInt(event.currentTarget.id);
  addAnimeToFav(animeIdSelected);
}

function handleRemoveFavorite(event) {
  const animeId = parseInt(event.currentTarget.dataset.id);
  removeAnimeFromFav(animeId);
}

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
    removeAnimeFromFav(animeSelected);
  }
  renderAnimes();
}

function removeAnimeFromFav(buttonSelected) {
  const buttonFavSelected = favoriteAnimeList.find(
    (favAnime) => favAnime.mal_id === buttonSelected
  );
  favoriteAnimeList.splice(buttonFavSelected, 1);
  addToLocalStorage();
  renderFavoriteAnimes();
  renderAnimes();
}

resetFavsButton.addEventListener('click', handleClickResetFavs);
