async function searchMovies() {
    const searchTitle = document.getElementById('searchInput').value; // Get the search input
    const resultsDiv = document.getElementById('results'); // Div to display results
    const moviesWrapper = document.querySelector(".results"); // Wrapper for loading state

    // Show loading state
    moviesWrapper.classList.add('movies__loading');

    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=c6a26922&s=${searchTitle}`);
        const moviesData = await response.json();

        // Check if the response contains movies
        if (moviesData.Response === "True") {
            // Limit to the first 6 movies
            const limitedMovies = moviesData.Search.slice(0, 6);

            // Render the movies
            resultsDiv.innerHTML = limitedMovies.map(movie => movieHTML(movie)).join('');
        } else {
            resultsDiv.innerHTML = `<p>No results found for "${searchTitle}".</p>`;
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        resultsDiv.innerHTML = `<p>Error fetching movies. Please try again later.</p>`;
    } finally {
        // Remove loading state
        moviesWrapper.classList.remove('movies__loading');
    }
}

// Function to create HTML for each movie
function movieHTML(movie) {
    return `
        <div class="movie">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <img src="${movie.Poster}" alt="${movie.Title} poster">
        </div>
    `;
}
setTimeout(() => {
searchMovies()
}, 1000); 
