import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImage } from './js/getImage';
import { observer, page, onLoad } from './js/onLoad';

const form = document.querySelector('.search-form');
const btnSearch = document.querySelector('.search-button');
const gallery = document.querySelector('.gallery');
const guard = document.querySelector('.js-guard');

form.addEventListener('submit', onSearchImg);

let per_page = 40;
let value = '';

btnSearch.onclick = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto',
  });
};

function onSearchImg(event) {
  event.preventDefault();
  value = form.searchQuery.value;
  getImage(value)
    .then(data => {
      if (data.hits.length === 0) {
        clearImgGallery();
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else if (data.hits.length >= data.totalHits) {
        clearImgGallery();
        Notiflix.Notify.warning(
          `We're sorry, but you've reached the end of search results.`
        );
      } else clearImgGallery();
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);
      gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
      galleryImg.refresh();
      observer.observe(guard);
    })
    .catch(error => console.log(error));
}

function clearImgGallery() {
  gallery.innerHTML = '';
}

function createMarkup(obj) {
  return obj
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
      <a href="${largeImageURL}">
      <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${likes}
        </p>
        <p class="info-item">
          <b>Views</b>${views}
        </p>
        <p class="info-item">
          <b>Comments</b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${downloads}
        </p>
      </div>
    </div>
      `
    )
    .join('');
}

let galleryImg = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  close: true,
});
galleryImg.refresh();

export { per_page, value, gallery, createMarkup, galleryImg, guard };