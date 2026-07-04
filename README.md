# CinePulse - Movie Listing & Search Explorer

A beautiful, premium, and fully responsive Movie Listing Application built using React.js, Vite, and vanilla CSS, powered by the OMDb API.

## Features

- **Trending Movies on Load**: Displays trending/popular movies (using "Marvel" by default) on initial loading if no search query has been entered.
- **Title Search**: Users can search for movies by entering titles in the search bar.
- **Detailed Movie View**: Click on any movie card to fetch and view full details (genre, director, actors, plot, IMDb Rating, release year, runtime).
- **Responsive Layout**: Designed for visual excellence and optimal viewing on both mobile and desktop screens.
- **Dark/Light Mode Theme**: Features a modern, sleek glassmorphic dark theme by default, with a toggle to switch to light theme.
- **Error Handling**: Displays helpful error messages when movies are not found or when API calls fail.
- **Vercel-Ready**: Built for fast compilation and optimized production builds. Includes environment variable configuration.

## Technologies Used

- **React.js (v19)**: Component-based UI logic.
- **Vite**: Rapid development environment and bundler.
- **OMDb API**: Film database integration.
- **CSS**: Premium dark-mode variables, smooth animations, and glassmorphic designs.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone or copy the project files to your directory.
2. Open your terminal in the project directory and install the dependencies:
   ```bash
   npm install
   ```

### Configuration (API Key)

This project communicates with the OMDb API using an API key. 

1. Create a `.env` file in the root of the project (one is already prepared with a fallback key):
   ```env
   VITE_OMDB_API_KEY=your_omdb_api_key_here
   ```
2. If you don't have an API key, you can register for a free one at [OMDb API Key Registration](http://www.omdbapi.com/apikey.aspx).
3. If no environment variable is provided, the application will automatically fall back to the default API key `e038db8a`.

### Running Locally

To start the Vite development server:
```bash
npm run dev
```
The application will be accessible at the URL shown in the terminal (usually `http://localhost:5173`).

### Building for Production

To compile the application into static files (saved in the `dist` directory):
```bash
npm run build
```

## Deployment to Vercel

CinePulse is configured to be deployed to Vercel out of the box.

1. Install the Vercel CLI or deploy via the Vercel Git integration.
2. In the Vercel project configuration, add your OMDb API key under environment variables:
   - **Key**: `VITE_OMDB_API_KEY`
   - **Value**: `[your_omdb_api_key]`
3. Deploy! Vite will compile the production bundle utilizing the defined Vercel environment variable.
