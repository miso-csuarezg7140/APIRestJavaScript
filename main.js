const apiInstance = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
});

apiInstance.defaults.headers.common['X-API-KEY'] = 'live_FAxVzuV4jCq3XgjV2CSbV26bkx61XrUeJN1tQfnYf1aONKT1txhB1fK7XPbksYMB'

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2'
const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites'
const API_URL_DELETE_FAVOURITES = (id) => `https://api.thecatapi.com/v1/favourites/${id}`
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload'

const spanError = document.getElementById('Error')

async function loadRandomCats() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log('Random')
    console.log(data)

    if (res.status != 200) {
        spanError.innerHTML = "Hubo un error: " + res.status
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () => saveFavouriteCats(data[0].id);
        btn2.onclick = () => saveFavouriteCats(data[1].id);
    }    
}

async function loadFavouriteCats() {
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'live_FAxVzuV4jCq3XgjV2CSbV26bkx61XrUeJN1tQfnYf1aONKT1txhB1fK7XPbksYMB'
        }
    });
    const data = await res.json();
    console.log('Favourites')
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: "+ res.status + data.message;
    } else {
        const section = document.getElementById('favouriteCats');
        section.innerHTML = "";
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Gatos favoritos');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        const res2 = await fetch(API_URL_FAVOURITES, {
            method: 'GET',
            headers: {
                'X-API-KEY': 'live_FAxVzuV4jCq3XgjV2CSbV26bkx61XrUeJN1tQfnYf1aONKT1txhB1fK7XPbksYMB'
            }
        });
        const data2 = await res2.json();
        data2.forEach(cat => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Borrar gato de favoritos');

            img.src = cat.image.url;
            img.width=150;
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavouriteCats(cat.id);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
}

async function saveFavouriteCats(id) {
    const { data, status} = await apiInstance.post('/favourites', {
        image_id: id
    });
    // const res = await fetch(API_URL_FAVOURITES, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'X-API-KEY': 'live_FAxVzuV4jCq3XgjV2CSbV26bkx61XrUeJN1tQfnYf1aONKT1txhB1fK7XPbksYMB'
    //     },
    //     body: JSON.stringify({
    //         image_id: id
    //     })
    // });

    // const data = await res.json();
    
    console.log('Save')
    // console.log(res)

    if (status !== 200) {
        spanError.innerHTML = "Hubo un error: "+ status + data.message
    } else {
        console.log('Gato guardado en favoritos')
        loadFavouriteCats();
    }
}

async function deleteFavouriteCats(id) {
    const res = await fetch(API_URL_DELETE_FAVOURITES(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': 'live_FAxVzuV4jCq3XgjV2CSbV26bkx61XrUeJN1tQfnYf1aONKT1txhB1fK7XPbksYMB'
        }
    });

    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: "+ res.status + data.message
    } else {
        console.log('Gato borrado de favoritos')
        loadFavouriteCats();
    }
}

async function uploadCatPhoto() {
    const form = document.getElementById('uploadingForm')
    const formData = new FormData(form);

    console.log(formData.get('file'))

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            'X-API-KEY': 'live_FAxVzuV4jCq3XgjV2CSbV26bkx61XrUeJN1tQfnYf1aONKT1txhB1fK7XPbksYMB'
        },
        body: formData
    })
}

loadRandomCats()
loadFavouriteCats()    