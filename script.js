const movieSearchBox = document.getElementById('movie-search-box');
const searchlist = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');
const logo = document.querySelector('.logo-click');

function findMovies() {
  let searchTerm = movieSearchBox.value.trim();

  if (searchTerm.length > 0) {
    searchlist.classList.remove('hide-search-list');
    loadMovies(searchTerm);
  } else searchlist.classList.add('hide-search-list');
}

function loadMovies(searchTerm) {
  if (!searchTerm) return;

  fetch(`https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=6346747e`)
    .then((res) => res.json())
    .then((data) => displayMovieList(data.Search));
}

function displayMovieList(movies) {
  if (!movies) return;
  searchlist.innerHTML = '';

  movies.forEach((movie) => {
    let movieListItem = document.createElement('div');
    movieListItem.dataset.id = movie.imdbID;
    movieListItem.classList.add('search-list-item');

    movieListItem.innerHTML = `
    <div class="search-item-thumbnail">
      <img src="${
        movie.Poster !== 'N/A' ? movie.Poster : 'image_not_found.png'
      }" alt="Thumbnail of the Movie" />
    </div>
    <div class="search-item-info">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    </div>
    `;
    searchlist.appendChild(movieListItem);
  });
  loadMovieDetails();
}

function loadMovieDetails() {
  if (!loadMovieDetails) return;
  const searchListMovies = searchlist.querySelectorAll('.search-list-item');

  searchListMovies.forEach((movie) => {
    movie.addEventListener('click', async () => {
      searchlist.classList.add('hide-search-list');
      movieSearchBox.value = '';

      const ApiCall = await fetch(
        `https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=6346747e`
      );
      const movieDetails = await ApiCall.json();

      displayMovieDetails(movieDetails);
    });
  });
}

function displayMovieDetails(movieDetails) {
  if (!movieDetails) return;
  resultGrid.innerHTML = `
  
<div class="movie-poster">
  <img src="${
    movieDetails.Poster !== 'N/A' ? movieDetails.Poster : 'image_not_found.png'
  }" alt="Poster of the Movie" />
</div>
<div class="movie-info">
  <h3 class="movie-title">${movieDetails.Title}</h3>
  <ul class="movie-misc-info">
    <li class="year">Year: ${movieDetails.Year}</li>
    <li class="rated">Ratings: ${movieDetails.Rated}</li>
    <li class="released">Released: ${movieDetails.Released}</li>
  </ul>
  <p class="genre">
    <strong>Genre:</strong> ${movieDetails.Genre}
  </p>
  <p class="writer">
    <strong>Writer:</strong> ${movieDetails.Writer}
  </p>
  <p class="actors">
    <strong>Actors:</strong> ${movieDetails.Actors}
  </p>
  <p class="plot">
    <strong>Plot:</strong> ${movieDetails.Plot}
  </p>
  <p class="language"><strong>Language:</strong> ${movieDetails.Language}</p>
  <p class="awards">
    <strong><i class="fas fa-award"></i></strong> ${movieDetails.Awards}
  </p>
</div>
`;
}

window.addEventListener('click', (event) => {
  if (event.target.className !== 'form-control')
    searchlist.classList.add('hide-search-list');
});

logo.addEventListener('click', () => {
  location.reload();
});
