// script

const input = document.getElementById('input-search');
const search = document.getElementById('svg-search');
const gallery = document.getElementById('gallery');

init();

function init() {
    requestFromApi();
}

input.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        requestFromApi(input.value);
    }
});

search.addEventListener('click', () => {
    requestFromApi(input.value);
});

function requestFromApi (search = 'javascript') {
    gallery.textContent = '';
    const url = `https://api.unsplash.com/search/photos?query=${search}&per_page=30&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;

    fetch(url)
    .then(response => {
        if (!response.ok){
            throw Error(response.statusText);
        }
        return response.json();
     })
    .then(data => {
        imagesLoadFromApi(data);
     })
    .catch(error => console.log(error));
}

function imagesLoadFromApi (data) {
    for(let i = 0;i < data.results.length;i++) {
        let image = document.createElement('div');
        image.className = 'image';
        image.style.backgroundImage = 'url('+data.results[i].urls.raw + '&w=1366&h=768' +')';
        gallery.appendChild(image);
    }
}