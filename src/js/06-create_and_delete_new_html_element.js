'use strict';

function createNewElement() {
  const parragraphElement = document.createElement('p');
  const text = document.createTextNode(
    'No se ha encontrado ningún anime con ese nombre :('
  );
  parragraphElement.classList.add('js-parragraphElement');
  sectionResults.appendChild(parragraphElement);
  parragraphElement.appendChild(text);
  parragraphElement.style.fontSize = '24px';
}

function deleteNewElement() {
  const parragraphElement = document.querySelector('.js-parragraphElement');
  sectionResults.removeChild(parragraphElement);
}
