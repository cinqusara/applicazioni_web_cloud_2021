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
const boxContentShop = document.getElementById('box-content-shop');

var loggedUserEmail = localStorage.getItem("logged_user_email");
var loggedUserEmailObj = JSON.parse(loggedUserEmail);

var jsonObjAsString = localStorage.getItem("json_users");
var jsonObj = JSON.parse(jsonObjAsString);

get_url(API_URL_POP, show_movie);

function get_url(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        callback(status, xhr.response.results);
    }
    xhr.send();
};

function show_movie(status, data) {
    main.innerHTML = '';
    if (data.length == 0) {
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
                                <button class = "know-more" id = "${id}">Info</button>
                                <button class="btn btn-heart" id = "${poster_path}"><i class="bi bi-shop"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shop" viewBox="0 0 16 16">
                                <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>
                              </svg></i></button> 
                                </div>
                            `
            main.appendChild(movieEl);

            document.getElementById(id).addEventListener("click", () => {
                openNav(movie);
            })

            document.getElementById(poster_path).addEventListener("click", () => {
                add_to_catalogue(movie);

            })
        });
    }
}

function get_video(stauts, videoData) {
    if (videoData) {
        document.getElementById("nav_shop").style.width = "100%";
        if (videoData.length > 0) {
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
            overlayContent.innerHTML = content;
            activeVideo = 0;
            show_videos();
            document.getElementById("info").addEventListener("click", () => {
                window.location.href = "info_film_shop.html";
            })
        } else {
            overlayContent.innerHTML = `<h1 class = "no-results"> No Results Found </h1>`;
        }
    }
}

function openNav(movie) {
    const id = movie.id;
    const VIDEO_URL = BASE_URL + '/movie/' + id + '/videos?' + API_KEY;
    localStorage.setItem("movie_info", JSON.stringify(movie));
    get_url(VIDEO_URL, get_video);
}

function closeNav() {
    document.getElementById("nav_shop").style.width = "0%";
}

function openNav_shop() {
    get_film();
    document.getElementById("shop-nav").style.width = "100%";
    boxContentShop.innerHTML = '';
    var movies = localStorage.getItem("shop_seller");
    var objMovies = JSON.parse(movies)
    if (objMovies.length > 0) {
        objMovies.forEach(film => {
            const { title, id } = film;
            const shopContent = document.createElement('div');
            shopContent.classList.add('shop-content');
            shopContent.innerHTML = `
                    <b class="title-film">Title: </b>
                    ${title}&nbsp;&nbsp;
                    <br><br>
                    `
            boxContentShop.appendChild(shopContent);

            document.getElementById(id).addEventListener("click", () => {
                window.location.href = "info_film_shop.html";
            })
        });
    }
}

function closeNav_shop() {
    document.getElementById("shop-nav").style.width = "0%";
}

var activeVideo = 0;
var totVideo = 0;

function show_videos() {
    const embedClasses = document.querySelectorAll('.embed');
    totVideo = embedClasses.length;
    embedClasses.forEach((embedTag, index) => {
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

function add_to_catalogue(movie) {
    const { id, title, vote_average } = movie;

    var found = false;
    var obj = {}
    obj['id'] = id;
    obj['title'] = title;

    jsonObj.forEach(user => {
        if (user.email == loggedUserEmailObj) {
            var film = {}
            film['id'] = id;
            film['email'] = user.email
            film['title'] = title;
            film['price_selling'] = get_price_selling(user.film_price, vote_average);
            film['shop'] = user.shopName
            film['price_rental'] = get_price_rental(user.film_price, vote_average);

            var shop = user.shop;

            shop.forEach(film => {
                if (film.id == id) {
                    found = true;
                }
            });

            if (found == false) {
                user.shop.push(obj);
                var movies = JSON.parse(localStorage.getItem("json_all_movies"));
                movies.push(film);
                localStorage.setItem("json_all_movies", JSON.stringify(movies));
                check_toggle(movie.poster_path, true);
            } else {
                var movies = JSON.parse(localStorage.getItem("json_all_movies"));
                remove_film(shop, movie, movies, user.email);
            }
        }
    });
    updateLocalStorage();
}

function get_film() {
    jsonObj.forEach(user => {
        if (user.email == loggedUserEmailObj) {
            localStorage.setItem("shop_seller", JSON.stringify(user.shop))
        }
    });
}

function remove_film(shop, movie, all_movies, email) {
    const s = shop.filter(film => film.id !== movie.id);
    const m = all_movies.filter(film => (film.id !== movie.id || film.email !== email))

    jsonObj.forEach(user => {
        if (user.email == loggedUserEmailObj) {
            user.shop = s
            updateLocalStorage();
        }
    });
    localStorage.removeItem("json_all_movies");
    localStorage.setItem("json_all_movies", JSON.stringify(m))
    check_toggle(movie.poster_path, false);
}


function updateLocalStorage() {
    localStorage.setItem("json_users", JSON.stringify(jsonObj));
}

function check_toggle(poster, addFilm) {
    var toToggle = document.getElementById(poster)
    if (addFilm == true) {
        toToggle.classList.remove("btn-heart");
        toToggle.classList.add("btn-heart-toggle")
    } else {
        toToggle.classList.add("btn-heart");
        toToggle.classList.remove("btn-heart-toggle")
    }
}


form.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerms = search.value;
    if (searchTerms) {
        get_url(SEARCH_URL + '&query=' + searchTerms, show_movie);
    } else {
        get_url(API_URL_POP, show_movie)
    }
})

document.getElementById('btn-myShop').addEventListener('click', () => {
    openNav_shop();
})

function get_price_selling(c, vote) {
    var priceFilm = c * vote * 1.5
    priceFilm = priceFilm.toFixed(1);
    return priceFilm;
}

function get_price_rental(c, vote) {
    var priceFilm = vote * c
    priceFilm = priceFilm.toFixed(1);
    return priceFilm;
}