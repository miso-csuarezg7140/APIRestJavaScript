const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_FAxVzuV4jCq3XgjV2CSbV26bkx61XrUeJN1tQfnYf1aONKT1txhB1fK7XPbksYMB'

const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites?limit=2&api_key=live_FAxVzuV4jCq3XgjV2CSbV26bkx61XrUeJN1tQfnYf1aONKT1txhB1fK7XPbksYMB'

const spanError = document.getElementById('Error')

async function loadRandomCats() {
    const res = await fetch(API_URL_RANDOM)
    const data = await res.json();
    console.log('Random')
    console.log(data)

    if (res.status != 200) {
        spanError.innerHTML = "Hubo un error: " + res.status
    } else {
        const img1 = document.getElementById('img1')
        const img2 = document.getElementById('img2')
        img1.src = data[0].url
        img2.src = data[1].url
    }    
}

async function loadFavouriteCats() {
    const res = await fetch(API_URL_FAVOURITES)
    const data = await res.json()
    console.log('Favourites')
    console.log(data)

    if (res.status != 200) {
        spanError.innerHTML = "Hubo un error: "+ res.status + data.message
    }
}

async function saveFavouriteCats() {
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: '3v7'
        }),
    });

    const data = await res.json();
    
    console.log('Save')
    console.log(res)

    if (res.status != 200) {
        spanError.innerHTML = "Hubo un error: "+ res.status + data.message
    }
}

loadRandomCats()
loadFavouriteCats()    