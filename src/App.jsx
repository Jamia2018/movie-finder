import React, { useState } from 'react';
import axios from 'axios';

// API configuration
const API_KEY = '430c370a';
const OMDB_BASE_URL = 'https://www.omdbapi.com/';

function App() {
  // State variables to store our data
  const [firstMovie, setFirstMovie] = useState(null);  // Stores first movie data
  const [secondMovie, setSecondMovie] = useState(null); // Stores second movie data
  const [searchQuery, setSearchQuery] = useState('');   // Stores what user types
  const [searchResults, setSearchResults] = useState([]); // Stores search results
  const [isLoading, setIsLoading] = useState(false);    // Shows loading spinner

  // Function to get detailed movie information
  const getMovieData = async (movieTitle) => {
    try {
      const response = await axios.get(OMDB_BASE_URL, {
        params: {
          apikey: API_KEY,
          t: movieTitle  // 't' means search by title
        }
      });
      return response.data;
    } catch (error) {
      console.log('Error getting movie:', error);
      return null;
    }
  };

  // Function to search for movies
  const searchMovies = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.get(OMDB_BASE_URL, {
        params: {
          apikey: API_KEY,
          s: searchQuery  // 's' means search
        }
      });
      setSearchResults(response.data.Search || []);
    } catch (error) {
      console.log('Error searching movies:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle when user types in search box
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle when user clicks search button
  const handleSearch = () => {
    searchMovies();
  };

  // Function to select a movie for comparison
  const selectMovie = async (movieTitle, slot) => {
    const movieData = await getMovieData(movieTitle);
    if (movieData && movieData.Response === 'True') {
      if (slot === 'first') {
        setFirstMovie(movieData);
      } else {
        setSecondMovie(movieData);
      }
      // Clear search after selecting
      setSearchQuery('');
      setSearchResults([]);
    }
  };


  // Function to convert box office string to number for comparison
  const getBoxOfficeNumber = (boxOffice) => {
    if (!boxOffice || boxOffice === 'N/A') return 0;
    // Remove all non-number characters and convert to number
    return Number(boxOffice.replace(/[^0-9]/g, ''));
  };

  // Function to convert rating string to number for comparison
  const getRatingNumber = (rating) => {
    if (!rating || rating === 'N/A') return 0;
    return Number(rating);
  };

  // Function to determine which movie wins a comparison
  const getWinnerClass = (firstValue, secondValue) => {
    if (firstValue > secondValue) return 'winner';
    if (firstValue < secondValue) return 'loser';
    return 'tie';
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <h1 className="text-center p-3" style={{ backgroundColor: '#bbdff2' }}>
        Movie Fight
      </h1>

      {/* Search Section */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Type movie name here..."
            />
            <button 
              className="btn btn-primary" 
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {/* Show search results */}
          {searchResults.length > 0 && (
            <div className="mt-3">
              <h5>Search Results:</h5>
              {searchResults.map((movie, index) => (
                <div key={index} className="card mb-2">
                  <div className="card-body">
                    <h6 className="card-title">{movie.Title} ({movie.Year})</h6>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => selectMovie(movie.Title, 'first')}
                      >
                        Select as Movie 1
                      </button>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => selectMovie(movie.Title, 'second')}
                      >
                        Select as Movie 2
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Movie Comparison Section */}
      <div className="row">
        {/* Movie 1 */}
        <div className="col-12 col-lg-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center mb-0">Movie 1</h3>
            </div>
            <div className="card-body text-center">
              {firstMovie ? (
                <div>
                  <img
                    src={firstMovie.Poster}
                    alt={firstMovie.Title}
                    className="img-fluid mb-3"
                    style={{ maxHeight: '300px' }}
                  />
                  <h4>{firstMovie.Title}</h4>
                  
                  {/* Box Office Comparison */}
                  <div className={`p-3 mb-2 rounded ${getWinnerClass(
                    getBoxOfficeNumber(firstMovie.BoxOffice),
                    getBoxOfficeNumber(secondMovie?.BoxOffice)
                  )}`}>
                    <strong>Box Office: {firstMovie.BoxOffice}</strong>
                  </div>

                  {/* Rating Comparison */}
                  <div className={`p-3 rounded ${getWinnerClass(
                    getRatingNumber(firstMovie.imdbRating),
                    getRatingNumber(secondMovie?.imdbRating)
                  )}`}>
                    <strong>IMDB Rating: {firstMovie.imdbRating}</strong>
                  </div>
                </div>
              ) : (
                <p className="text-muted">No movie selected yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Movie 2 */}
        <div className="col-12 col-lg-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center mb-0">Movie 2</h3>
            </div>
            <div className="card-body text-center">
              {secondMovie ? (
                <div>
                  <img
                    src={secondMovie.Poster}
                    alt={secondMovie.Title}
                    className="img-fluid mb-3"
                    style={{ maxHeight: '300px' }}
                  />
                  <h4>{secondMovie.Title}</h4>
                  
                  {/* Box Office Comparison */}
                  <div className={`p-3 mb-2 rounded ${getWinnerClass(
                    getBoxOfficeNumber(secondMovie.BoxOffice),
                    getBoxOfficeNumber(firstMovie?.BoxOffice)
                  )}`}>
                    <strong>Box Office: {secondMovie.BoxOffice}</strong>
                  </div>

                  {/* Rating Comparison */}
                  <div className={`p-3 rounded ${getWinnerClass(
                    getRatingNumber(secondMovie.imdbRating),
                    getRatingNumber(firstMovie?.imdbRating)
                  )}`}>
                    <strong>IMDB Rating: {secondMovie.imdbRating}</strong>
                  </div>
                </div>
              ) : (
                <p className="text-muted">No movie selected yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
