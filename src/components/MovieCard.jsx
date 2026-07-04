import React from 'react';

export default function MovieCard({ movie, onClick }) {
  const { Title, Year, Poster, Type } = movie;
  const securePoster = Poster && Poster !== 'N/A' ? Poster.replace(/^http:\/\//i, 'https://') : null;

  return (
    <div className="movie-card" onClick={onClick} role="button" tabIndex="0">
      <div className="movie-poster-wrapper">
        {securePoster ? (
          <img 
            src={securePoster} 
            alt={`Poster for ${Title}`} 
            className="movie-poster"
            loading="lazy"
          />
        ) : (
          <div className="movie-poster-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
              <line x1="7" y1="2" x2="7" y2="22"></line>
              <line x1="17" y1="2" x2="17" y2="22"></line>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <line x1="2" y1="7" x2="7" y2="7"></line>
              <line x1="2" y1="17" x2="7" y2="17"></line>
              <line x1="17" y1="17" x2="22" y2="17"></line>
              <line x1="17" y1="7" x2="22" y2="7"></line>
            </svg>
            <span>No Image Available</span>
          </div>
        )}
        <span className="movie-type-badge">{Type}</span>
      </div>
      <div className="movie-info">
        <h3 className="movie-title" title={Title}>{Title}</h3>
        <div className="movie-year">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {Year}
        </div>
      </div>
    </div>
  );
}
