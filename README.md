# Movie Fight App

A React Vite application that allows users to compare two movies side-by-side based on their box office performance and IMDB ratings.

## Features

- Search for movies using the OMDB API
- Compare two movies side-by-side
- Visual comparison with color-coded statistics:
  - Green background for higher values
  - Orange background for lower values
  - White background for equal values
- Responsive design using Bootstrap
- Real-time search suggestions

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. Enter a movie title in the first search box
2. Select a movie from the dropdown suggestions
3. Enter a movie title in the second search box
4. Select a movie from the dropdown suggestions
5. Compare the movies based on their box office performance and ratings

## API

This app uses the OMDB API (http://www.omdbapi.com/) to fetch movie data. The API key is included in the code for demonstration purposes.

## Technologies Used

- React 18
- Vite
- Bootstrap 5
- Axios
- CSS3
