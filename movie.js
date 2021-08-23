/*JS PER LA PAGINA CHOOSE_FILM - API OF TMDB*/

const API_KEY = 'api_key=627ed135a25c4ee59e036330690af646';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL_POP = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main');

get_movies(API_URL_POP, show_movie)


function get_movies(url, callback) {
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
    main.innerHTML = '';
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        console.log(movie);
        console.log(IMG_URL + poster_path);
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
                            </div>
                            `
        main.appendChild(movieEl);
    });
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