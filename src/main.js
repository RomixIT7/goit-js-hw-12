import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

import errorIcon from './img/error-icon.svg';
import closeIcon from './img/close-icon.svg';

const form = document.querySelector('.search-form');
const list = document.querySelector('.images-list');
const loader = document.querySelector('.loader');
const loadMoreForm = document.querySelector('.load-more-form');

let page = 1;
let per_page = 15;
let value = null;
let totalResults = 0;

form.addEventListener('submit', onBtnClick);
loadMoreForm.addEventListener('submit', onLoadMoreClick);

async function onBtnClick(e) {
  e.preventDefault();
  list.innerHTML = '';
  page = 1;
  loadMoreForm.classList.add('hidden');
  value = form.elements.search.value.trim();
  if (value === '') return;
  showLoader();
  try {
    const res = await getInfo(value);
    renderMarkup(res);
    totalResults = res.total;
    if (res.hits.length !== 0) {
      loadMoreForm.classList.remove('hidden');
    }
  } catch (error) {
    console.log(error);
  }
  hideLoader();
  endOfCollection();
  form.reset();
}

async function onLoadMoreClick(e) {
  e.preventDefault();
  loadMoreForm.classList.add('hidden');
  page++;
  showLoader();
  try {
    const res = await getInfo(value);
    renderMarkup(res);
    if (res.hits.length !== 0) {
      loadMoreForm.classList.remove('hidden');
    }
  } catch (error) {
    console.log(error);
  }
  hideLoader();
  endOfCollection();
  const image = document.querySelector('.gallery-image');
  const { height } = image.getBoundingClientRect();
  window.scrollBy({
    top: height * 3.5,
    left: 0,
    behavior: 'smooth',
  });
}

async function getInfo(value) {
  const res = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '42394910-99d99ece52e00ce85305c6646',
      q: value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page,
      page,
    },
  });
  return res.data;
}

function renderMarkup({ hits }) {
  if (hits.length === 0) {
    showNotification(
      'Sorry, there are no images matching<br/> your search query. Please try again!'
    );
    return;
  }
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}"
        ><img class="gallery-image" src="${webformatURL}" alt="${tags}"
      /></a>
      <div class="info-box">
        <p>Likes <span>${likes}</span></p>
        <p>Views <span>${views}</span></p>
        <p>Comments <span>${comments}</span></p>
        <p>Downloads <span>${downloads}</span></p>
      </div>
    </li>`
    )
    .join('');
  list.insertAdjacentHTML('beforeend', markup);
  showLightBox();
}

function showNotification(message) {
  iziToast.show({
    message,
    messageColor: '#fff',
    messageSize: '16',
    messageLineHeight: '24',
    backgroundColor: '#ef4040',
    progressBarColor: '#b51b1b',
    position: 'topRight',
    iconUrl: errorIcon,
    close: false,
    buttons: [
      [
        `<button type="submit" style="background-color: inherit"><img src="${closeIcon}"/></button>`,
        function (instance, toast) {
          instance.hide(
            {
              transitionOut: 'fadeOut',
            },
            toast
          );
        },
      ],
    ],
  });
}

function showLightBox() {
  const lightbox = new simpleLightbox('.images-list a', {
    captionsData: 'alt',
    captionsDelay: 250,
  });
  lightbox.refresh();
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function endOfCollection() {
  const pagesQuantity = Math.ceil(totalResults / per_page);
  if (pagesQuantity === page) {
    loadMoreForm.classList.add('hidden');
    showNotification(
      `We're sorry, but you've reached</br> the end of search results.`
    );
  }
}
