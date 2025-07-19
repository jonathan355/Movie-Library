let currentFilter ='';

async function searchMovies(filter) {
    const searchTitle = document.getElementById('searchInput').value; 
   
    const resultsDiv = document.getElementById('results'); 
    
    const moviesWrapper = document.getElementById("results"); 

    moviesWrapper.classList.add('movies__loading');
    resultsDiv.innerHTML = '<i class="fas fa-spinner results__loading--spinner"></i>'

   

    try {
        const response = await fetch(
            `http://www.omdbapi.com/?apikey=c6a26922&s=${searchTitle}`);
        const moviesData = await response.json();

        if (moviesData.Response === "True") {
            const movies = moviesData.Search.slice(0, 6);

            if (filter === 'TITLE_A_TO_Z') {
                    movies.sort((a, b) => a.Title.localeCompare(b.Title));
            }

                else if (filter === 'TITLE_Z_TO_A') {
                    movies.sort((a, b) => b.Title.localeCompare(a.Title));
            }

                else if (filter === 'OLDEST_TO_NEWEST') {
                    movies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year)); 
            }
                else if (filter === 'NEWEST_TO_OLDEST') {
                    movies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
            }

            resultsDiv.innerHTML = movies
            .map(movie => movieHTML(movie))
            .join('');
        } else {
            resultsDiv.innerHTML = `<p>No results found for "${searchTitle}".</p>`;
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        resultsDiv.innerHTML = `<p>Error fetching movies. Please try again later.</p>`;
    } finally {
        moviesWrapper.classList.remove('movies__loading');
    }
}

 


document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filter');

    searchInput.addEventListener('keydown', function(event) {
        if (event.key ==='Enter') {
            searchMovies(currentFilter);
        }
    });

filterSelect.addEventListener('change', (event) => {
    currentFilter = event.target.value;
    searchMovies(currentFilter)

});

});

function movieHTML(movie) {
    return `
        <div class="movie">
            <img src="${movie.Poster}" alt="${movie.Title} poster" class= "small-image">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        </div>
    `;
}

function filterMovies(event) {
    currentFilter = event.target.value; // Update the global currentFilter
    searchMovies(currentFilter);        // Call searchMovies with the new filter
}

