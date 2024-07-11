import"./assets/modulepreload-polyfill-3cfb730f.js";import{S as r,i}from"./assets/vendor-8c59ed88.js";const o=document.querySelector("form"),s=document.querySelector(".gallery"),c=t=>`https://pixabay.com/api/?${new URLSearchParams({key:"35719926-181ab604ec6a85b118ffdb3f0",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0})}`,l=new r(".gallery a"),p=t=>{const a=t.map(e=>`<li>
        <div class="card">
        <a href="${e.largeImageURL}"><img class="gallery_img" width ="360px" height="200px" src="${e.webformatURL}" alt="${e.tags}"></a>
        <div class="information_box">
        <p class="information"><span class="information_header">Likes:</span>${e.likes}</p>
        <p class="information"><span class="information_header">Views:</span>${e.views}</p>
        <p class="information"><span class="information_header">Comments:</span>${e.comments}</p>
        <p class="information"><span class="information_header">Downloads:</span>${e.downloads}</p></div>
        </div>
        </li>`).join("");s.insertAdjacentHTML("afterbegin",a),l.refresh()},m=t=>{t.reset()},h=t=>{s.textContent="",s.insertAdjacentHTML("afterbegin",'<span class="loader"></span>'),t.preventDefault();const a=c(t.target.elements[0].value);fetch(a).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).then(e=>{const n=e.hits;console.log(n),n.length===0&&(s.textContent="",i.error({title:"",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})),p(n),m(o)}).catch(e=>console.log(e))};o.addEventListener("submit",h);
//# sourceMappingURL=commonHelpers2.js.map
