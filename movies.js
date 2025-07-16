async function searchMovies() {
    const searchTitle = document.getElementById('searchInput').value; 
    document.body.classList += ' results__loading'
    const resultsDiv = document.getElementById('results'); 
    document.body.classList.remove ('results__loading')
    const moviesWrapper = document.querySelector(".results"); 

    moviesWrapper.classList.add('movies__loading');
    resultsDiv.innerHTML = "<p>Loading...</p>"

    if (filter === 'TITLE_A_TO_Z') {
        movie.sort((a,b) => a.Title.localeCompare(b.Title));
    }

    else if (filter === 'TITLE_Z_TO_A') {
        movie.sort((a,b) => b.Title.localeCompare(a.Title));
    }

    else if (filter === 'OLDEST_TO_NEWEST') {
        movie.sort((a,b) => a.Year - b.Year); 
    }
    else if (filter === 'NEWEST_TO_OLDEST') {
        movie.sort((a,b) => b.Year - a.Year);
    }


    try {
        const response = await fetch(
            `http://www.omdbapi.com/?apikey=c6a26922&s=${searchTitle}`

        );
        const moviesData = await response.json();

        if (moviesData.Response === "True") {
            const limitedMovies = moviesData.Search.slice(0, 6);
            resultsDiv.innerHTML = limitedMovies
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

document.addEventListener('DOMContentLoaded',() => {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('keydown',function(event) {
        if(event.key ==='Enter') {
            searchMovies();
        }
    }

    )
}

)

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
searchMovies(event.target.value);
}

setTimeout(() => {
searchMovies()
}, 2000); 
