/*JS PER LA PAGINA CHOOSE_FILM - API OF TMDB*/

const API_KEY = 'api_key=627ed135a25c4ee59e036330690af646';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL_POP = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form_search');
const search = document.getElementById('search');
const overlayContent = document.getElementById('overlay-content');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const boxContentFavorite = document.getElementById('box-content-favorite')

var loggedUserEmail = localStorage.getItem("logged_user_email");
var loggedUserEmailObj = JSON.parse(loggedUserEmail);

var jsonObjAsString = localStorage.getItem("json_users");
var jsonObj = JSON.parse(jsonObjAsString);

get_url(API_URL_POP, show_movie);

function get_url(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        //console.log(xhr.response);
        callback(status, xhr.response.results);
    }
    xhr.send();
};

function show_movie(status, data) {
    //console.log(data)
    main.innerHTML = '';
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview, id } = movie;
        //console.log(movie);
        // console.log(IMG_URL + poster_path);
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-container');
        movieEl.innerHTML = `
                                <img src="${IMG_URL + poster_path}">
                                <div class="movie-info">
                                    <h3>${title}</h3>
                                    <span class="${getColor(vote_average)}">${vote_average}</span>
                                </div>

                                <div class="overview">
                                <h3>Overview</h3>
                                ${overview}
                                <br>
                                <button class = "know-more" id = "${id}">Know More</button>
                                <button class="btn btn-heart" id = "${poster_path}"><i class="fa fa-heart"></i></button> 
                                </div>
                            `
        main.appendChild(movieEl); //aggiunge l'elemento al DOM

        //quando clicchiamo sul pulsante "know more", intercetta l'evento e l'id del film
        document.getElementById(id).addEventListener("click", () => {
            openNav(movie);
        })

        //gli passo il poster path perchè è l'unico dato univico oltre l'id
        document.getElementById(poster_path).addEventListener("click", () => {
            set_favorites(movie);

        })
    });
}

function get_video(stauts, videoData) {
    //console.log(videoData)
    if (videoData) {
        document.getElementById("myNav").style.width = "100%";
        if (videoData.length > 0) {
            // console.log(videoData.length);
            var embed = [];
            var info = [];
            videoData.forEach(video => {
                const { id, key, name, site } = video;
                if (site == 'YouTube') {
                    embed.push(`
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" 
                    title="${name}" class = "embed hide" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                    </iframe>
                    `)
                }
            })
            info.push(`<button class = "know-more" id = "info">Info</button>`)
            var content = `
            <p><h1 class = "no-results">Video</h1></p>
            <br>
            ${embed.join('')} 
            <br>
            <br>
            ${info.join('')}
            `
            //embed.join('') aggiunge l'HTML di embed.push nell'overlay-content
            overlayContent.innerHTML = content;
            activeVideo = 0;
            show_videos();
            document.getElementById("info").addEventListener("click", () => {
                window.location.href = "info_film.html";
            })
        } else {
            overlayContent.innerHTML = `<h1 class = "no-results"> No Results Found </h1>`;
        }
    }
}

//nav dei video
function openNav(movie) {
    const id = movie.id;
    //quando apro 'know more' di un film gli passo l'id e prendo i video
    const VIDEO_URL = BASE_URL + '/movie/' + id + '/videos?' + API_KEY;  //BASE_URL + '/movie/' + id -> dalla doc per prendere un video con le API
    localStorage.setItem("movie_info", JSON.stringify(movie));
    get_url(VIDEO_URL, get_video);
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

//nav dei preferiti
function openNav_favorite() {
    get_favorite();
    document.getElementById("favorite-nav").style.width = "100%";
    boxContentFavorite.innerHTML = '';
    var favorites = localStorage.getItem("user_favorites");
    var objFavorites = JSON.parse(favorites)
    //console.log(objFavorites)
    objFavorites.forEach(fav => {
        const { title, id } = fav;
        const favoriteContent = document.createElement('div');
        favoriteContent.classList.add('favorite-content');
        favoriteContent.innerHTML = `
                    <b class="title-favorite">Title: </b>
                    ${title}
                    <br><br>
        `
        boxContentFavorite.appendChild(favoriteContent);
    });
}

function closeNav_favorite() {
    document.getElementById("favorite-nav").style.width = "0%";
}

var activeVideo = 0; //video sempre attivo
var totVideo = 0;
function show_videos() {
    const embedClasses = document.querySelectorAll('.embed'); //ritorna una node list, simile ad un array
    totVideo = embedClasses.length;
    embedClasses.forEach((embedTag, index) => { //itera per video e per numero (se ho 3 video, prima mostrerà lo 0-esimo etc.)
        if (activeVideo == index) {
            embedTag.classList.add('show');
            embedTag.classList.remove('hide');
        } else {
            embedTag.classList.add('hide');
            embedTag.classList.remove('show');
        }
    })
}

function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

function set_favorites(movie) {

    //console.log(movie)
    console.log("1. set favorite")
    const { id, title } = movie;
    var found = false;
    var obj = {}
    obj['id'] = id;
    obj['title'] = title;
    jsonObj.forEach(user => {
        console.log("2. dentro ciclo");
        if (user.email == loggedUserEmailObj) {
            var favorites = user.favorite;
            console.log("dentro a if")
            //console.log(favorites)
            favorites.forEach(fav => {
                // console.log(user.favorite)
                if (fav.id == id) {
                    console.log("dentro la coppia");
                    found = true;
                    //var newFavorites = remove_fav(id, favorites);
                    // console.log("new favorites"+newFavorites)
                    // localStorage.setItem("json_users", JSON.stringify(newFavorites));
                }
            });
            if (found == false) {
                user.favorite.push(obj)
            } else {
                remove_fav(favorites, id);
            }
        }
    });
    updateLocalStorage();
}

function get_favorite() {
    jsonObj.forEach(user => {
        if (user.email == loggedUserEmailObj) {
            //console.log(typeof JSON.stringify(user.favorites))
            localStorage.setItem("user_favorites", JSON.stringify(user.favorite))
        }
    });
}

function remove_fav(favorites, id) {
    console.log("4. in remove favorite")
    const fav = favorites.filter(film => film.id !== id);
    console.log(fav);
    var jsonObjAsString = localStorage.getItem("json_users");
    var jsonObj = JSON.parse(jsonObjAsString);
    console.log(jsonObj.favorite);
}

function updateLocalStorage() {
    localStorage.setItem("json_users", JSON.stringify(jsonObj));
}

//se clicco sulla freccia di destra
rightArrow.addEventListener('click', () => {
    if (activeVideo < (totVideo - 1)) {
        activeVideo++;
    } else {
        activeVideo = 0;
    }
    show_videos();
})

//se clicco sulla freccia di sinistra
leftArrow.addEventListener('click', () => {
    if (activeVideo > 0) { //se è in una posizione !=0 vado a sx normalmente
        activeVideo--;
    } else { //altrimenti devo sfogliare tutti i film e mostrando l'ultimo
        activeVideo = totVideo - 1;
    }
    show_videos();
})

form.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerms = search.value;
    if (searchTerms) {
        get_url(SEARCH_URL + '&query=' + searchTerms, show_movie);
    } else {
        get_url(API_URL_POP, show_movie)
    }
})

document.getElementById('btn-favorite').addEventListener('click', () => {
    openNav_favorite();
})













