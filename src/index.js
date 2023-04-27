import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios, { all } from 'axios';

const inputEl = document.querySelector('input');
const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadBtn = document.querySelector('#load-more');

let pagE = 1;

async function fechApi() {
  return await axios.get('https://pixabay.com/api', {
    params: {
      key: '35719926-181ab604ec6a85b118ffdb3f0',
      q: inputEl.value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: pagE,
    },
  });
}

function renderImages(allImages) {
  if (allImages.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  const renderImages = allImages.hits
    .map(image => {
      return `<div class="photo-card">
    <a href="${image.largeImageURL}"><img class="photo-card__img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b></br>${image.likes}
      </p>
      <p class="info-item">
        <b>Views</b></br>${image.views}
      </p>
      <p class="info-item">
        <b>Comments</b></br>${image.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b></br>${image.downloads}
      </p>
    </div>
  </div>
  `;
    })
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', renderImages);
  let gallery = new SimpleLightbox('.gallery a');
}

formEl.addEventListener('submit', e => {
  galleryEl.innerHTML = '';
  pagE = 1;
  e.preventDefault();
  fechApi()
    .then(data => {
      renderImages(data.data);
      pagE += 1;
      if (data.data.hits.length >= 40) {
        loadBtn.classList.replace('hidden', 'load-more');
      } else if (data.data.hits.length < 40 && data.data.hits.length > 0) {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => {
      console.log(error);
    });
});

loadBtn.addEventListener('click', () => {
  fechApi()
    .then(data => {
      renderImages(data.data);
      pagE += 1;
      if (data.data.hits.length < 40) {
        loadBtn.classList.replace('load-more', 'hidden');
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => {
      console.log(error);
    });
});
