async function searchMovies(searchTitle) {

    const query = document.getElementById('searchInput').value;

    const resultsDiv = document.getElementById('results');

    const moviesWrapper = document.querySelector(".results");
    const movies = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=c6a26922&s=${searchTitle}`);
    const moviesData = await movies.json();

    booksWrapper.classList += ' movies__loading'

    if (!movies) {
    movies = await getMovies();
    }
  
    moviesWrapper.classList.remove('books__loading')
   
    const limitedMovies = postsMovies.slice(0, 6);

   
    movieListEl.innerHTML = limitedMovies.map(movies => movieHTML(movie))
    .join('');
}

moviesWrapper.innerHTML = booksHtml;

function movieHTML(movie) {
    return `
    <div class="movie">
      <div class="movie__title">
        ${movie.title}
      </div>
      <p class="movie__body">
        ${movie.poster}
      </p>
    </div>
    `;
    resultsDiv.innerHTML = `You searched for: ${query}`;
}

setTimeout(() => {
renderMovies()})