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
const boxContentFavorite = document.getElementById('box-content-favorite');
const tagsEl = document.getElementById('tags');

var loggedUserEmail = localStorage.getItem("logged_user_email");
var loggedUserEmailObj = JSON.parse(loggedUserEmail);

var jsonObjAsString = localStorage.getItem("json_users");
var jsonObj = JSON.parse(jsonObjAsString);

var selectGenre = [];

const genre = [{
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]

get_url(API_URL_POP, show_movie);

function get_url(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        //console.log(xhr.response);
        callback(status, xhr.response.results);
    }
    xhr.send();
};

function show_movie(status, data) {
    console.log(data.length)
    main.innerHTML = '';
    if (data.length == 0) {
        console.log("no result")
        main.innerHTML = `
        <h2 class = "noFilm">No Results</h2>
        `
    } else {
        data.forEach(movie => {
            const { title, poster_path, vote_average, overview, id } = movie;
            var img = IMG_URL + poster_path
            if (poster_path == null) {
                img = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1040&q=80"
            }
            //console.log(movie);
            console.log(IMG_URL + poster_path);
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie-container');

            movieEl.innerHTML = `
                                <img src="${img}">
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
    const VIDEO_URL = BASE_URL + '/movie/' + id + '/videos?' + API_KEY; //BASE_URL + '/movie/' + id -> dalla doc per prendere un video con le API
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
    if (objFavorites.length > 0) {
        objFavorites.forEach(fav => {
            const { title, id } = fav;
            const favoriteContent = document.createElement('div');
            favoriteContent.classList.add('favorite-content');
            favoriteContent.innerHTML = `
                    <b class="title-favorite">Title: </b>
                    ${title}&nbsp;&nbsp;
                    <br><br>
                    `
            boxContentFavorite.appendChild(favoriteContent);

            // document.getElementById(id).addEventListener("click", () => {
            //     window.location.href = "info_film.html";
            // })
        });
    }
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
    const { id, title } = movie;
    var found = false;
    var obj = {}
    obj['id'] = id;
    obj['title'] = title;
    jsonObj.forEach(user => {
        if (user.email == loggedUserEmailObj) {
            var favorites = user.favorite;
            //console.log(favorites)
            favorites.forEach(fav => {
                // console.log(user.favorite)
                if (fav.id == id) {
                    console.log("dentro la coppia");
                    found = true;
                }
            });
            if (found == false) {
                user.favorite.push(obj)
                check_toggle(movie.poster_path, true);
            } else {
                remove_fav(favorites, movie);
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

function remove_fav(favorites, movie) {
    const fav = favorites.filter(film => film.id !== movie.id);
    jsonObj.forEach(user => {
        if (user.email == loggedUserEmailObj) {
            user.favorite = fav
            updateLocalStorage();
        }
    });
    check_toggle(movie.poster_path, false);
}

function updateLocalStorage() {
    localStorage.setItem("json_users", JSON.stringify(jsonObj));
}

function check_toggle(poster, addFav) {
    console.log("dentro a check_toggle")
    var toToggle = document.getElementById(poster)
    console.log(toToggle)
    console.log(poster)
    if (addFav == true) {
        toToggle.classList.remove("btn-heart");
        toToggle.classList.add("btn-heart-toggle")
    } else {
        toToggle.classList.add("btn-heart");
        toToggle.classList.remove("btn-heart-toggle")
    }
}

set_genre();

function set_genre(url, callback) {
    tagsEl.innerHTML = ` `;
    genre.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if (selectGenre.length == 0) {
                selectGenre.push(genre.id)
            } else {
                if (selectGenre.includes(genre.id)) {
                    selectGenre.forEach((id, index) => { //index serve per capire in che posizione è il genere
                        if (id == genre.id) {
                            selectGenre.splice(index, 1) //rimuoviamo 1 elemento alla posizione "index"
                        }
                    })
                } else {
                    selectGenre.push(genre.id)
                }
            }
            console.log(selectGenre)
            get_url(API_URL_POP + '&with_genres=' + encodeURI(selectGenre.join(',')), show_movie) //separa tutti gli elementi di selectGenre con una ,
            show_genre();
        })
        tagsEl.append(t);
    })
}



function show_genre() {
    const tags = document.querySelectorAll('.tag'); //ritorna l'array con ogni tag
    tags.forEach(tag => { //elimina il tag colorato se ci riclicco
        tag.classList.remove('hightlight')
    })
    if (selectGenre.length != 0) {
        selectGenre.forEach(id => {
            const hightlightTag = document.getElementById(id);
            hightlightTag.classList.add('hightlight');
        })
    }
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