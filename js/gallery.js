import images from './gallery-items.js';

const containerImages = document.querySelector('.js-gallery');
const galleryImages = createGallaryImages(images);
containerImages.insertAdjacentHTML('afterbegin', galleryImages);
containerImages.addEventListener('click', onImageContainerClick)

const containerModalOpen = document.querySelector('div.lightbox');
const modalOpenImage = document.querySelector('.lightbox__image')

const overlayModalClick = document.querySelector('.lightbox__overlay')
const buttonModalClick = document.querySelector('.lightbox__button')

const containerModalClose = document.querySelector('button[data-action="close-lightbox"]')

overlayModalClick.addEventListener('click', onOverlayAndBtnClick)
buttonModalClick.addEventListener('click', onOverlayAndBtnClick)

function createGallaryImages(images) {
  return images.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  }).join('');
}

function onImageContainerClick(evt) {
  evt.preventDefault();
  
  const isGalleryEl = evt.target.classList.contains('js-gallery');
  if (isGalleryEl) {
    return;
  }
  // console.log('target', evt.target);
  // console.log('currentTarget', evt.currentTarget);

  onOpenModalClick()
  addModalImage(evt)
  // previousImage(e)
}

function onOpenModalClick() {
  containerModalOpen.classList.add('is-open');
}

function addModalImage(evt) {
  modalOpenImage.src = evt.target.dataset.source;
  modalOpenImage.alt = evt.target.alt;
}

function onOverlayAndBtnClick(evt) {
  if (evt.target === overlayModalClick || evt.target === containerModalClose) {
    onCloseModal();
  }
}

function onCloseModal() {
  // window.removeEventListener(‘keydown’, onEscCloseModal);
  // galleryListRef.removeEventListener(‘keydown’, onClickImageSlider);
  containerModalOpen.classList.remove('is-open');
    clearLightBoxImage();
} 

function clearLightBoxImage() {
  modalOpenImage.removeAttribute("src");
  modalOpenImage.removeAttribute("alt");
}

function previousImage(e) {
  if (!(e.key === "ArrowLeft")) {
    return;
  }
  let index = items.findIndex((el) => {
    return el.original === modalOpenImage.getAttribute("src");
  });
  if (index === 0) {
    index = items.length;
  }
  index -= 1;
  const previousPic = items[index].original;
  modalOpenImage.setAttribute("src", previousPic);
}
/* <li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li> */


// function onOverlayAndBtnClick(e) {
//   if (e.target === lightboxOverlayRef(ссылка на оверлей) || e.target === modalCloseBtnRef(ссылка на кнопку закрытия через дата атрибут)) {
//     onCloseModal();
//   }
// }
// function onCloseModal() {
//   // window.removeEventListener(‘keydown’, onEscCloseModal);
//   // galleryListRef.removeEventListener(‘keydown’, onClickImageSlider);
//   lightboxRef.classList.remove(‘is-open’);
//   unsetImageAttributes();
// } 