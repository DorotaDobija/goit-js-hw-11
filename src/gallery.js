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
    });
    
    return `https://pixabay.com/api/?${params}`;
}

const lightbox = new SimpleLightbox('.gallery a');

const createListItemToAdd = (arr) => {
    const image = arr.map(image => `<li>
        <div class="card">
        <a href="${image.largeImageURL}"><img class="gallery_img" width ="360px" height="200px" src="${image.webformatURL}" alt="${image.tags}"></a>
        <div class="information_box">
        <p class="information"><span class="information_header">Likes:</span>${image.likes}</p>
        <p class="information"><span class="information_header">Views:</span>${image.views}</p>
        <p class="information"><span class="information_header">Comments:</span>${image.comments}</p>
        <p class="information"><span class="information_header">Downloads:</span>${image.downloads}</p></div>
        </div>
        </li>`).join('');
    gallery.insertAdjacentHTML("afterbegin", image);
    lightbox.refresh();
}
const clearFunc = (form) => {
    form.reset();
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
            console.log(imagesArr)
            if (imagesArr.length === 0) {
                gallery.textContent = "";
                iziToast.error({
                title: '',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight'
});
            }
            
            createListItemToAdd(imagesArr);
            clearFunc(formEl);
        })
        .catch(error => console.log(error));
}



formEl.addEventListener("submit", sendRequest)