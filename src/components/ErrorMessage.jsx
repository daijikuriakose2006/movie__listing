import React from 'react';

export default function ErrorMessage({ title = "No Results Found", message, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">{title}</h2>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="search-button">
          Try Again
        </button>
      )}
    </div>
  );
}
