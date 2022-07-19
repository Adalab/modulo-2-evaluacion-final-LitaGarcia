'use strict';

const addEventListenerToAnimeCards = () => {
  const animeCards = document.querySelectorAll('.js-card');
  animeCards.forEach((anime) =>
    anime.addEventListener('click', handlefavoriteClick)
  );
};

const addEventListenertoFavs = () => {
  const buttonFavs = document.querySelectorAll('.js-removeFavs');
  buttonFavs.forEach((anime) =>
    anime.addEventListener('click', handleRemoveFavorite)
  );
};

const isAlreadyFav = (animeId) => {
  const favoriteFound = favoriteAnimeList.findIndex(
    (favAnime) => favAnime.mal_id === animeId
  );
  return favoriteFound !== -1;
};

const createAnimeCardHtml = (animeTitle, animeId, imageUrl) => {
  let animeHtml = '';
  if (isAlreadyFav(animeId)) {
    animeHtml = `<li class='cards'><div class='js-card isAlreadyToFav' id='${animeId}' style="cursor:pointer"><img src='${imageUrl}' alt='Portada del anime que has buscado' title='Anime Image'/>`;
  } else {
    animeHtml = `<li class='cards'><div class='js-card' id='${animeId}' style="cursor:pointer"><img src='${imageUrl}' alt='Portada del anime que has buscado' title='Anime Image'/>`;
  }
  animeHtml += `<h2>${animeTitle}`;
  animeHtml += `</div></h2>`;
  return animeHtml;
};

const createAnimeFavCardHtml = (anime) => {
  let animeCardHtml = '';
  animeCardHtml = `<li class='cards'><div class='js-card' id='${anime.mal_id}' style="cursor:pointer"><img src='${anime.images.jpg.image_url}' alt='Portada del anime que has buscado' title='Anime Image'/>`;
  animeCardHtml += `<h2>${anime.title}`;
  animeCardHtml += `</div></h2>`;
  const animeFavCard =
    animeCardHtml +
    `<button style="cursor:pointer" class="js-removeFavs data-id=${anime.mal_id} buttonRemoveOne"></button></li>`;
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
  animeHtml + `</li>`;
  return animeHtml;
};

function renderAnimes() {
  let globalHtml = '';
  animeList.forEach((anime) => (globalHtml += createAnimeHTML(anime)));
  ul.innerHTML = globalHtml;
  addEventListenerToAnimeCards();
}

function renderFavoriteAnimes() {
  let globalHtml = '';
  favoriteAnimeList.forEach((anime) => {
    globalHtml += createAnimeFavCardHtml(anime);
  });
  ulFavs.innerHTML = globalHtml;
  addEventListenertoFavs();
}
