const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_FAxVzuV4jCq3XgjV2CSbV26bkx61XrUeJN1tQfnYf1aONKT1txhB1fK7XPbksYMB'

const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_FAxVzuV4jCq3XgjV2CSbV26bkx61XrUeJN1tQfnYf1aONKT1txhB1fK7XPbksYMB'

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
    const res = await fetch(API_URL_FAVOURITES);
    const data = await res.json();
    console.log('Favourites')
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: "+ res.status + data.message;
    } else {
        const res2 = await fetch(API_URL_FAVOURITES);
        const data2 = await res2.json();
        data2.forEach(cat => {
            const section = document.getElementById('favouriteCats');
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Borrar gato de favoritos');

            btn.appendChild(btnText);
            img.src = cat.image.url
            img.width=500

            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
}

async function saveFavouriteCats(id) {
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id
        }),
    });

    const data = await res.json();
    
    console.log('Save')
    console.log(res)

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: "+ res.status + data.message
    } else {
        const res2 = await fetch(API_URL_FAVOURITES);
        const data2 = await res2.json();
        data2.forEach(cat => {
            const section = document.getElementById('favouriteCats');
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Borrar gato de favoritos');

            btn.appendChild(btnText);
            img.src = cat.image.url
            img.width=500

            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
}

loadRandomCats()
loadFavouriteCats()    