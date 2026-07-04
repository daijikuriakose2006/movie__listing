import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieDetailModal from './components/MovieDetailModal';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

const DEFAULT_POPULAR_TERM = 'Avengers';
const DEFAULT_SEARCH_TERM = 'Marvel';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(DEFAULT_POPULAR_TERM);
  const [activeTab, setActiveTab] = useState('popular'); // 'popular' | 'movie' | 'series'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Detail Modal States
  const [selectedMovieID, setSelectedMovieID] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Theme State
  const [isLightTheme, setIsLightTheme] = useState(false);

  // Get API key from Vite environment or default key
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'e038db8a';
  const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

  // Toggle Theme helper
  const toggleTheme = () => {
    setIsLightTheme((prev) => {
      const nextTheme = !prev;
      if (nextTheme) {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
      return nextTheme;
    });
  };

  // Fetch Movies
  const fetchMovies = useCallback(async (query, type = '') => {
    setLoading(true);
    setError(null);
    try {
      let url = `${BASE_URL}&s=${encodeURIComponent(query)}`;
      if (type) {
        url += `&type=${type}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.Response === 'True') {
        setMovies(data.Search || []);
      } else {
        setMovies([]);
        setError(data.Error || 'No movies found.');
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Failed to connect to OMDb API. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  }, [BASE_URL]);

  // Fetch Movie Details
  const fetchMovieDetails = useCallback(async (imdbID) => {
    setDetailsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}&i=${imdbID}&plot=full`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovieDetails(data);
      } else {
        console.error('Error fetching details:', data.Error);
      }
    } catch (err) {
      console.error('Error fetching details:', err);
    } finally {
      setDetailsLoading(false);
    }
  }, [BASE_URL]);

  // Initial Fetch (Default Movies)
  useEffect(() => {
    fetchMovies(DEFAULT_POPULAR_TERM);
  }, [fetchMovies]);

  // Search Handler
  const handleSearch = (query) => {
    setSearchTerm(query);
    // When searching, we search based on the current tab filter
    const filterType = activeTab === 'movie' ? 'movie' : activeTab === 'series' ? 'series' : '';
    fetchMovies(query, filterType);
  };

  // Tab Switch Handler
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    
    // Determine the query term to use
    // If the search term is the default popular term, and they click movie/series, we switch to default search term 'Marvel'
    let currentQuery = searchTerm;
    if (searchTerm === DEFAULT_POPULAR_TERM && tabName !== 'popular') {
      currentQuery = DEFAULT_SEARCH_TERM;
      setSearchTerm(DEFAULT_SEARCH_TERM);
    } else if (tabName === 'popular') {
      currentQuery = DEFAULT_POPULAR_TERM;
      setSearchTerm(DEFAULT_POPULAR_TERM);
    }

    if (tabName === 'popular') {
      fetchMovies(currentQuery, '');
    } else if (tabName === 'movie') {
      fetchMovies(currentQuery, 'movie');
    } else if (tabName === 'series') {
      fetchMovies(currentQuery, 'series');
    }
  };

  // Open Details Modal Handler
  const handleMovieClick = (imdbID) => {
    setSelectedMovieID(imdbID);
    setMovieDetails(null); // Clear previous details
    fetchMovieDetails(imdbID);
  };

  // Close Details Modal Handler
  const handleCloseModal = () => {
    setSelectedMovieID(null);
    setMovieDetails(null);
  };

  return (
    <div className="app-container">
      <Navbar isLightTheme={isLightTheme} toggleTheme={toggleTheme}>
        <SearchBar 
          onSearch={handleSearch} 
          initialValue={
            searchTerm === DEFAULT_POPULAR_TERM || searchTerm === DEFAULT_SEARCH_TERM 
              ? '' 
              : searchTerm
          } 
        />
      </Navbar>

      <main className="main-content">
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'popular' ? 'active' : ''}`}
            onClick={() => handleTabChange('popular')}
          >
            🔥 Popular
          </button>
          <button 
            className={`tab-btn ${activeTab === 'movie' ? 'active' : ''}`}
            onClick={() => handleTabChange('movie')}
          >
            🎬 Movies
          </button>
          <button 
            className={`tab-btn ${activeTab === 'series' ? 'active' : ''}`}
            onClick={() => handleTabChange('series')}
          >
            📺 Series
          </button>
        </div>

        <div className="results-header">
          <h2 className="results-title">
            {searchTerm === DEFAULT_POPULAR_TERM && activeTab === 'popular'
              ? 'Popular Trending'
              : searchTerm === DEFAULT_SEARCH_TERM && activeTab !== 'popular'
              ? `Recommended ${activeTab === 'movie' ? 'Movies' : 'Series'}`
              : `Search Results in ${activeTab.toUpperCase()}`}
          </h2>
          {movies.length > 0 && (
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {movies.length} results found
            </span>
          )}
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage 
            message={error} 
            onRetry={() => fetchMovies(searchTerm, activeTab === 'popular' ? '' : activeTab)} 
          />
        ) : (
          <MovieGrid movies={movies} onMovieClick={handleMovieClick} />
        )}
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CinePulse. Built with React.js and OMDb API.</p>
      </footer>

      <MovieDetailModal 
        movieID={selectedMovieID}
        movieDetails={movieDetails}
        loading={detailsLoading}
        onClose={handleCloseModal}
      />
    </div>
  );
}
