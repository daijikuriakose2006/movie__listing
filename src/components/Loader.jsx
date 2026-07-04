import React from 'react';

export default function Loader({ message = "Fetching data from CinePulse..." }) {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p className="loader-text">{message}</p>
    </div>
  );
}
