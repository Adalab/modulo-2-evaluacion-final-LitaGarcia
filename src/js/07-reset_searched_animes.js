'use strict';

const handleClickReset = (event) => {
  event.preventDefault();
  animeList = [];
  renderAnimes();
  deleteNewElement();
};
resetButton.addEventListener('click', handleClickReset);
