const movieInfo = localStorage.getItem("movie_info");
const movie = JSON.parse(movieInfo)
const { title, poster_path, vote_average, overview, release_date, genre_ids, id } = movie;
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
const director = localStorage.getItem("director")
const directorFilm = JSON.parse(director)

const all_movies_string = localStorage.getItem("all_movies")
const all_movies = JSON.parse(all_movies_string)

var loggedUserEmail = localStorage.getItem("logged_user_email");
var loggedUserEmailObj = JSON.parse(loggedUserEmail);

const API_KEY = 'api_key=627ed135a25c4ee59e036330690af646';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=627ed135a25c4ee59e036330690af646';
const CREDITS_URL = BASE_URL + '/movie/' + movie.id + '/credits?' + API_KEY;
const API_URL_POP = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;


page_film();
get_url(CREDITS_URL, get_credits);

function get_url(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        //console.log(xhr.response);
        callback(status, xhr.response.crew);
    }
    xhr.send();
};

function get_credits(status, credits) {
    var director = ""
    credits.forEach(c => {
        if (c.job == "Director") {
            director += c.name + " ";
        }
    });
    localStorage.setItem("director", JSON.stringify(director));
    //console.log(localStorage.getItem("director"))
}

function page_film() {
    //console.log(movie);
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
                     <b>Director: </b>${directorFilm} <br><b>Relase Date: </b>${release_date}
                    </div>
                </div>
                <div class="col-6">
                    <div class="p-3 border bg-light box-movie genre">
                       <b>Genre</b>: ${get_genre()}<br> <br>
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
                </div>
            </div>
            <div class="row g">
                <div class="col">
                    <div class="p-3 border bg-light box-movie" id="catalogue_all_seller"></div>
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
            }
        });
    });
    return results;
}

get_all_movies(title);

function get_all_movies(title) {
    var all_movies = JSON.parse(localStorage.getItem("json_all_movies"));
    const catalogue_all_seller = document.getElementById("catalogue_all_seller");
    catalogue_all_seller.innerHTML = "<h3>Price</h3>";
    in_catalogue = false;
    //console.log(catalogue_all_seller)
    //console.log(all_movies);
    all_movies.forEach(m => {
        const movie_on_catalogue = document.createElement('span');
        if (m.title == title) {
            in_catalogue = true
            console.log(m)
            movie_on_catalogue.innerHTML = `
                     <span><b>Seller:</b> ${m.shop} <b id = "rentalPrice" >Rental Price:</b> ${m.price_rental} <b id = "sellingPrice">Selling Price:</b> ${m.price_selling}
                     </span> &nbsp
                     <button class = "info-price" id = "${m.email}"><i class="bi bi-cart-plus-fill"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                     <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"/>
                   </svg></i></button>
                     <br>
                 `
            catalogue_all_seller.append(movie_on_catalogue);

            document.getElementById(m.email).addEventListener("click", () => {
                openNav_buy_film(m);
            })
        }

    });
    if (in_catalogue == false) {
        const movie_on_catalogue = document.createElement('span');
        movie_on_catalogue.innerHTML = `Currently the film is not available in our catalog, we apologize for the inconvenience`;
        catalogue_all_seller.append(movie_on_catalogue);
    }
}

function openNav_buy_film(m) {
    document.getElementById("nav_buy_film").style.width = "100%";
    var box = document.getElementById("content-buy-film")
    box.innerHTML = `
    <h3>Do you want to buy or rent the movie?</h3>
    <br>
    <div class="container overflow-hidden">
        <div class="row gx-5">
            <div class="col container-buy-film ">
                <div class="p-3 border">
                    <h5>On Sale</h5>
                    <h3 style ="color:#A67683"><b>${m.title}</b></h3>
                    <br>
                    Shop: ${m.shop}<br><br>
                    Price:&nbsp; <h3><b>$${m.price_selling}</b></h3>
                    <br>
                    <img src="ticket1.png" class="img-buy-film" style="max-width:300px;max-height:300px;  cursor: pointer;"  onclick="onClickImg('selling')">
                    <br> <br>
                    <p style = "color:whitesmoke">By purchasing the movie, you have the possibility to see it as many times as you want</p>
                </div>
            </div>
            <div class="col container-buy-film ">
            <div class="p-3 border">
                <h5>For Rent</h5>
                <h3 style ="color:#A67683"><b>${m.title}</b></h3>
                <br>
                Shop: ${m.shop}<br><br>
                Price:&nbsp; <h3><b>$${m.price_rental}</b></h3>
                <br>
                <img src="ticket2.png" class="img-buy-film" style="max-width:300px;max-height:300px; cursor: pointer;" onclick="onClickImg('rental')">
                <br> <br>
                <p style ="color:whitesmoke">By renting the movie, you have the possibility to see it only for the next 72 hours</p>
            </div>
        </div>
        </div>
    </div>
    `
}

function closeNav_buy_film() {
    document.getElementById("nav_buy_film").style.width = "0%";
}

function onClickImg(buying) {
    console.log("click")
    var obj = {}
    obj['title'] = title;
    obj['id'] = id;
    obj['buying'] = buying;

    console.log(obj)

    var users = JSON.parse(localStorage.getItem('json_users'));

    users.forEach(u => {
        if (u.email == loggedUserEmailObj) {
            u.bought_movies.push(obj)
        }
    });

    localStorage.setItem("json_users", JSON.stringify(users))

    window.location.href = "card_payment.html"
}