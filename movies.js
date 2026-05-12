let inputVal;

window.onload = function() {
  const receivedData = localStorage.getItem("sharedData");

  if (receivedData) {
    loadMovies();
  }
};

function clickPress(event) {
  if (event.key == "Enter") {   
    loadMovies();
  }
}

async function loadMovies(movies) {
  const moviesWrapper = document.querySelector(".movies");

  moviesWrapper.innerHTML = "";

  moviesWrapper.classList.add('movies__loading');

  await timer();

  moviesWrapper.classList.remove('movies__loading');  

  renderMovies();
} 
  
async function renderMovies(filter) {    
  const moviesWrapper = document.querySelector(".movies");
       
  if (document.getElementById("userInput").value) {
    inputVal = document.getElementById("userInput").value;
  }
  else {
    inputVal = localStorage.getItem("sharedData");
  }
  
  const results = await fetch (`https://www.omdbapi.com/?s=${inputVal}&type=movie&apikey=e0a5be46`);
  const resultsData = await results.json(); 

  if (!resultsData.Search) {
    moviesWrapper.innerHTML = 'No Movies Found';
    return;
  }  

  const movies = resultsData.Search.splice(0, 6);

  if(filter === 'A_TO_Z') {
    movies.sort((a, b) => (a.Title.localeCompare(b.Title)));
  }
  else if (filter === 'Z_TO_A') {
    movies.sort((a, b) => (b.Title.localeCompare(a.Title)));
  }
  else if (filter === 'NEW_TO_OLD') {
    movies.sort((a, b) => (b.Year - a.Year));    
  }
  else if (filter === 'OLD_TO_NEW') {
    movies.sort((a, b) => (a.Year - b.Year));
  }

  const moviesHtml = movies
    .map((movie) => {
      return `
      <div class="movie-card">
        <div class="movie">
        <figure class="movie__img--wrapper">
          <img 
          src="https://img.omdbapi.com/?i=${movie.imdbID}&h=300&apikey=e0a5be46"
          onerror="this.onerror=null; this.src='assets/No Image.png';"
        >
        </figure>
        <div class="movie__title">
          ${movie.Title}
        </div>
        <div class="movie__year">
          ${movie.Year}
        </div>
        </div>
      </div>`;
    })
    .join("");

  moviesWrapper.innerHTML = moviesHtml; 

  const movieCards = document.querySelectorAll(".movie-card");

  movieCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("movie-card--visible");
    }, index * 100);
  });  
}

function timer() {
  return new Promise(resolve => 
    setTimeout(resolve, 1000))  
}

function filterMovies(event) {
  renderMovies(event.target.value);
}

function resetSort() {
  document.getElementById("filter").selectedIndex = 0;
  localStorage.removeItem("sharedData");
}

function openMenu() {
  document.body.classList += " menu--open"
}

function closeMenu() {
  document.body.classList.remove('menu--open')
}