import React, { useEffect } from 'react';
import Loader from './Loader';

export default function MovieDetailModal({ movieID, movieDetails, loading, onClose }) {
  useEffect(() => {
    if (!movieID) return;

    // Disable body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    // Listen for Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [movieID, onClose]);

  if (!movieID) return null;

  const securePoster = movieDetails && movieDetails.Poster && movieDetails.Poster !== 'N/A' 
    ? movieDetails.Poster.replace(/^http:\/\//i, 'https://') 
    : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        
        {loading ? (
          <Loader message="Loading details..." />
        ) : movieDetails ? (
          <div className="modal-body">
            <div className="modal-poster-wrapper">
              {securePoster ? (
                <img 
                  src={securePoster} 
                  alt={movieDetails.Title} 
                  className="modal-poster"
                />
              ) : (
                <div className="movie-poster-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                    <line x1="7" y1="2" x2="7" y2="22"></line>
                    <line x1="17" y1="2" x2="17" y2="22"></line>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                  </svg>
                  <span>No Poster Image</span>
                </div>
              )}
            </div>
            
            <div className="modal-details">
              <div className="modal-header">
                <h2 className="modal-title">{movieDetails.Title}</h2>
                <div className="modal-meta-row">
                  <span className="modal-meta-item">{movieDetails.Year}</span>
                  <span className="modal-meta-item">{movieDetails.Rated}</span>
                  <span className="modal-meta-item">{movieDetails.Runtime}</span>
                  <span className="modal-meta-item">{movieDetails.Genre}</span>
                  {movieDetails.imdbRating && movieDetails.imdbRating !== 'N/A' && (
                    <div className="modal-meta-rating">
                      <span>⭐</span>
                      <span>{movieDetails.imdbRating}/10</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="modal-plot-section">
                <h3 className="modal-plot-title">Plot</h3>
                <p className="modal-plot-text">{movieDetails.Plot || "No plot synopsis available."}</p>
              </div>
              
              <div className="modal-crew-section">
                {movieDetails.Director && movieDetails.Director !== 'N/A' && (
                  <div className="crew-item">
                    <span className="crew-label">Director</span>
                    <span className="crew-value">{movieDetails.Director}</span>
                  </div>
                )}
                
                {movieDetails.Actors && movieDetails.Actors !== 'N/A' && (
                  <div className="crew-item">
                    <span className="crew-label">Actors</span>
                    <span className="crew-value">{movieDetails.Actors}</span>
                  </div>
                )}

                {movieDetails.Writer && movieDetails.Writer !== 'N/A' && (
                  <div className="crew-item">
                    <span className="crew-label">Writers</span>
                    <span className="crew-value">{movieDetails.Writer}</span>
                  </div>
                )}

                {movieDetails.Released && movieDetails.Released !== 'N/A' && (
                  <div className="crew-item">
                    <span className="crew-label">Released</span>
                    <span className="crew-value">{movieDetails.Released}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <p>Could not load details for this movie.</p>
          </div>
        )}
      </div>
    </div>
  );
}
