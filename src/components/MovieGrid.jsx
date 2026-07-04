import React from 'react';
import MovieCard from './MovieCard';

export default function MovieGrid({ movies, onMovieClick }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard 
          key={movie.imdbID} 
          movie={movie} 
          onClick={() => onMovieClick(movie.imdbID)} 
        />
      ))}
    </div>
  );
}
