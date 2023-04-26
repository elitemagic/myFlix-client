import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";

import { MovieView } from "../movie-view/movie-view";

import { LoginView } from "../login-view/login-view";




export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  
  useEffect(() => {
    if (!token) return;

    fetch("https://my-flix-service.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((data) => {
      const moviesFromApi = data.map((movie) => {
        return {
          idd: movie._id,
          title: movie.Title,
          description: movie.Description,
          genre: movie.Genre.Name,
          director: movie.Director.Name,
          image: movie.ImagePath
        };
      });

      setMovies(moviesFromApi);
    });
  }, [token]);

  if (!user) {
    return (
    <LoginView
      onLoggedIn={(user, token) => {
        setUser(user);
        setToken(token);
      }}
     />
    );
  }

  if (selectedMovie) {
    const similarMovies = movies.filter(movie => movie.genre === selectedMovie.genre && movie.title !== selectedMovie.title)
    return (
      <div>
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      <hr />
      <h2>Movie of shared genre:</h2>
        
        {similarMovies.map(movie => (
          <MovieCard key={movie.idd} movie={movie} onMovieClick={setSelectedMovie} />
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
          key={movie.idd}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      
      <button onClick={() => { setUser(null); setToken(null); }}>Logout</button>

    </div>
  );
  
};

