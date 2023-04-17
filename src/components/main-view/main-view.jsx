import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";

import { MovieView } from "../movie-view/movie-view";




export const MainView = () => {
  const [movies, setMovies] = useState([]);


  const [selectedMovie, setSelectedMovie] = useState(null);

  
  useEffect(() => {
    fetch("https://my-flix-service.onrender.com/movies")
    .then((response) => response.json())
    .then((data) => {
      const moviesFromApi = data.map((movie) => {
        return {
          id: movie._id,
          title: movie.Title,
          description: movie.Description,
          genre: movie.Genre.Name,
          director: movie.Director.Name,
          image: movie.ImagePath
        };
      });

      setMovies(moviesFromApi);
    });
  }, []);

  if (selectedMovie) {
    const similarMovies = movies.filter(movie => movie.genre === selectedMovie.genre && movie.title !== selectedMovie.title)
    return (
      <div>
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      <hr />
      <h2>Similar Movies:</h2>
        
        {similarMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onMovieClick={setSelectedMovie} />
        ))}
      </div>
    );
  }
  
  

  if (movies.length === 0) {
    return <div>The list is empty</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};