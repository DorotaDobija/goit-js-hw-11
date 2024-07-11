import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const formEl = document.querySelector("form");
const gallery = document.querySelector(".gallery")


const createUrl = (value) => {
    const params = new URLSearchParams({
    key: "35719926-181ab604ec6a85b118ffdb3f0",
    q: value,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: 100,
    });
    
    return `https://pixabay.com/api/?${params}`;
}

const lightbox = new SimpleLightbox('.gallery a');

const createListItemToAdd = (arr) => {
    const image = arr.map(image => `<li><a href="${image.largeImageURL}"><img width="200px" src="${image.webformatURL}" alt="${image.tags}"></a></li>`).join('');
    gallery.insertAdjacentHTML("afterbegin", image);
    lightbox.refresh();
}

const sendRequest = (event) => {
    gallery.textContent = "";
    gallery.insertAdjacentHTML("afterbegin", '<span class="loader"></span>')
    event.preventDefault();
    const url = createUrl(event.target.elements[0].value);
    fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.status)
            }
            return res.json();
        })
        .then((images) => {
            const imagesArr = images.hits;
            if (imagesArr.length === 0) {
                iziToast.error({
                title: '',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight'
});
            }
            
            createListItemToAdd(imagesArr);
        })
        .catch(error => console.log(error));
}



formEl.addEventListener("submit", sendRequest)