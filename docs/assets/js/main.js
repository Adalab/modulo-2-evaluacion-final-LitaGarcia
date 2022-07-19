"use strict";const ul=document.querySelector(".js-ul"),inputTitle=document.querySelector(".js-inputTitle"),searchButton=document.querySelector(".js-searchButton"),SERVER_URL="https://api.jikan.moe/v4/anime?limit=5&q=",defaultImg="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png",customizedDefaultImg="https://via.placeholder.com/210x295/ffffff/666666/?text=TV",ulFavs=document.querySelector(".js-ulFavs"),sectionResults=document.querySelector(".js-sectionResults"),resetButton=document.querySelector(".js-resetButton"),resetFavsButton=document.querySelector(".js-resetFavs");let animeList=[],favoriteAnimeList=[];const addEventListenerToAnimeCards=()=>{document.querySelectorAll(".js-card").forEach(e=>e.addEventListener("click",handlefavoriteClick))},addEventListenertoFavs=()=>{document.querySelectorAll(".js-removeFavs").forEach(e=>e.addEventListener("click",handleRemoveFavorite))},isAlreadyFav=e=>-1!==favoriteAnimeList.findIndex(t=>t.mal_id===e),createAnimeCardHtml=(e,t,a)=>{let n="";return n=isAlreadyFav(t)?`<li class='cards'><div class='js-card isAlreadyToFav' id='${t}' style="cursor:pointer"><img src='${a}' alt='Portada del anime que has buscado' title='Anime Image'/>`:`<li class='cards'><div class='js-card' id='${t}' style="cursor:pointer"><img src='${a}' alt='Portada del anime que has buscado' title='Anime Image'/>`,n+="<h2>"+e,n+="</div></h2>",n},createAnimeFavCardHtml=e=>{let t="";t=`<li class='cards'><div class='js-card' id='${e.mal_id}' style="cursor:pointer"><img src='${e.images.jpg.image_url}' alt='Portada del anime que has buscado' title='Anime Image'/>`,t+="<h2>"+e.title,t+="</div></h2>";return t+`<button style="cursor:pointer" class="js-removeFavs data-id=${e.mal_id} buttonRemoveOne"></button></li>`},createAnimeHTML=e=>{let t="";const a=e.images.jpg.image_url;return t+=createAnimeCardHtml(e.title,e.mal_id,a),t};function renderAnimes(){let e="";animeList.forEach(t=>e+=createAnimeHTML(t)),ul.innerHTML=e,document.querySelectorAll(".js-card").forEach(e=>e.addEventListener("click",handlefavoriteClick))}function renderFavoriteAnimes(){let e="";favoriteAnimeList.forEach(t=>{e+=createAnimeFavCardHtml(t)}),ulFavs.innerHTML=e,document.querySelectorAll(".js-removeFavs").forEach(e=>e.addEventListener("click",handleRemoveFavorite))}const getAnimeDataByTitle=e=>{fetch(`${SERVER_URL}${e}`).then(e=>e.json()).then(e=>{0===e.data.length&&createNewElement(),animeList=e.data.map(e=>{const t=e.images.jpg.image_url,a=t.includes(defaultImg);return e.images.jpg.image_url=a?customizedDefaultImg:t,e}),console.log(animeList),renderAnimes()})},handleClickSearch=e=>{e.preventDefault(),console.log("holis");const t=inputTitle.value;getAnimeDataByTitle(t)};searchButton.addEventListener("click",handleClickSearch);const handleClickResetFavs=e=>{e.preventDefault(),favoriteAnimeList=[],addToLocalStorage(),renderFavoriteAnimes()};function handlefavoriteClick(e){addAnimeToFav(parseInt(e.currentTarget.id))}function handleRemoveFavorite(e){removeAnimeFromFav(parseInt(e.currentTarget.dataset.id))}function addAnimeToFav(e){const t=animeList.find(t=>e===t.mal_id);-1===favoriteAnimeList.findIndex(e=>e.mal_id===t.mal_id)?(favoriteAnimeList.push(t),addToLocalStorage(),renderFavoriteAnimes()):removeAnimeFromFav(t),renderAnimes()}function removeAnimeFromFav(e){const t=favoriteAnimeList.find(t=>t.mal_id===e);favoriteAnimeList.splice(t,1),addToLocalStorage(),renderFavoriteAnimes(),renderAnimes()}function addToLocalStorage(){localStorage.setItem("favoritesAnimes",JSON.stringify(favoriteAnimeList))}resetFavsButton.addEventListener("click",handleClickResetFavs);const getLocalStorage=()=>{const e=JSON.parse(localStorage.getItem("favoritesAnimes"));e&&(favoriteAnimeList=e,renderFavoriteAnimes())};function createNewElement(){const e=document.createElement("p"),t=document.createTextNode("No se ha encontrado ningún anime con ese nombre :(");e.classList.add("js-parragraphElement"),sectionResults.appendChild(e),e.appendChild(t),e.style.fontSize="24px"}function deleteNewElement(){const e=document.querySelector(".js-parragraphElement");sectionResults.removeChild(e)}getLocalStorage();const handleClickReset=e=>{e.preventDefault(),animeList=[],renderAnimes(),deleteNewElement()};resetButton.addEventListener("click",handleClickReset);