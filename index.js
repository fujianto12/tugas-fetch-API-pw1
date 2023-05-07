const API_KEY = 'api_key=80f9d1266345cf2824ebec75ca64bdb1'
const BASE_URL = 'https://api.themoviedb.org/3/'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+ API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const genre = 'https://api.themoviedb.org/3/genre/movie/list?api_key='+API_KEY +'&language=en-US'


getMovies(API_URL)

function getMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovie(data.results)
        console.log(genre);
    })

}
function showMovie(data) {

    main.innerHTML = ''
    

    data.forEach(movie =>{
        const {title,poster_path, vote_average, overview} = movie;
        const movieEL = document.createElement('div')

        movieEL.classList.add('movie')
        movieEL.innerHTML = ` 
        <img src="${IMG_URL + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average} </span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>`


        main.appendChild(movieEL)
    })
}
function showGenre() {
    
}

function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const pencarian = search.value

    if (pencarian) {
        getMovies(searchURL + '&query=' + pencarian)
    }else{
        getMovies(API_URL   )
    }
})