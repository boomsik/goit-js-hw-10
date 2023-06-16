import { Notify } from 'notiflix';
import SlimSelect from 'slim-select'
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";

new SlimSelect({
  select: '#selectElement'
})

const refs = {
  selectEl: document.querySelector('.breed-select'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
  catInfoEl: document.querySelector('.cat-info'),
};

function showLoader() {
  refs.loaderEl.style.display = 'block';
}

function hideLoader() {
  refs.loaderEl.style.display = 'none';
}

function hideError() {
  refs.errorEl.style.display = 'none';
}

function showError() {
  refs.errorEl.style.display = 'block';
}

function hideCatInfo() {
  refs.catInfoEl.style.display = 'none';
}

function showCatInfo() {
  refs.catInfoEl.style.display = 'block';
}

fetchBreeds()
  .then(breeds => {
    hideLoader();
    hideError();
    showCatInfo();

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      refs.selectEl.appendChild(option);
    });
  })
  .catch(error => {
    hideLoader();
    showError();
    hideCatInfo();
    console.error('Error fetching breeds:', error);
  });

document.addEventListener('DOMContentLoaded', () => {
  hideError();
});


refs.selectEl.addEventListener('change', changeOnSelect);

function changeOnSelect(event) {
  event.preventDefault();

  const selectedBreedId = event.target.value;

  hideCatInfo();
  showLoader();
  hideError();

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      hideLoader();
      hideError();
      showCatInfo();
      createCatDescription(catData);
    })
    .catch(err => {
      hideLoader();
      showError();
      Notify.failure('Error fetching cat data: ' + err);
    });
}

function createCatDescription(catData) {
  catData.forEach(cat => {
    console.dir(cat);
    refs.catInfoEl.innerHTML = `
    <div class="cat-info-wrap">
        <img src="${cat.url}" alt="Cat Image" width="300">
        <div class="cat-info-text">
            <h3>${cat.breeds[0].name}</h3>
            <p>${cat.breeds[0].description}</p>
            <p>Temperament: ${cat.breeds[0].temperament}</p>
        </div>
    </div>
    `;
  });
}



