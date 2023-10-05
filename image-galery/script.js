// script

const input = document.getElementById('input-search');
const search = document.getElementById('svg-search');
const gallery = document.getElementById('gallery');
const clean = document.getElementById('clean-svg');

init();

function init() {
    requestFromApi();
    input.focus();
}

input.addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && input.value.length > 0 ) {
        requestFromApi(input.value);
    }
});

search.addEventListener('click', () => {
    if (input.value.length > 0) {
        requestFromApi(input.value);
    }
});

input.addEventListener('input', cleanInput);

clean.addEventListener('click', () => {
    input.value = '';
    cleanInput();
})

function cleanInput() {
    if (input.value.length > 0) {
        clean.style.display = 'block';
    } else {
        clean.style.display = 'none';
    }
}

function requestFromApi (search = 'javascript') {
    gallery.textContent = '';
    const url = `https://api.unsplash.com/search/photos?query=${search}&per_page=30&client_id=sUS67w3YLcrLrr78TgPalNL6g2Watsu7tqbuUNVU8Sc`;

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