const API_KEY = 'api_key=627ed135a25c4ee59e036330690af646';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=627ed135a25c4ee59e036330690af646';
//const GENRE_URL = BASE_URL + '/genre/movie/list?' + API_KEY + '&language=en-US';

const movieInfo = localStorage.getItem("movie_info");
const movie = JSON.parse(movieInfo)
const { title, poster_path, vote_average, overview, release_date, genre_ids } = movie;
const genre = [
    {
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


page_film();


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

function page_film() {
    console.log(movie);
    // console.log("info film: "+ title + " " + poster_path + " " + vote_average + " " + overview + " " + id);
    const pageInfo = document.getElementById('container-info');
    pageInfo.innerHTML = `
    <div class="container rating">
        <br>
        <h1 class = "title-movie">${title}</h1>
        <h3> Rating: <span class="${get_color(vote_average)}">${vote_average}</span></h3>
        <br>
        <div class="container container-info" >
            <div class="row g-2">
                <div class="col-6">
                    <div class="p-3 border bg-light box-movie">
                       Regista e ${release_date}
                    </div>
                </div>
                <div class="col-6">
                    <div class="p-3 border bg-light box-movie genre">
                       <b>Genre</b>: ${get_genre()}
                    </div>
                </div>
                <div class="col-6">
                    <div class="p-3 border bg-light  box-movie">
                        <div class = "img-movie"> 
                            <img src="${IMG_URL + poster_path}" alt="Movie's Photo">
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="p-3 border bg-light box-movie">
                        <h3> Overview </h3>
                        ${overview}
                    </div>
                    <div class="p-3 border bg-light box-movie">
                       Costo
                    </div>
                </div>
            </div>
        </div>
    </div>
    `

};

function get_color(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
};

function get_genre() {
    var results = '';
    var count = 0;
    genre.forEach(element => {
        const { id, name } = element;
        //console.log(id, name);
        //console.log(genre_ids)
        genre_ids.forEach(e => {
            count++;
            if (id == e && count != genre_ids.length) {
                //console.log(e + " " + id)
                results += name + " ";
            }e
        });

    });
    return results;
}
