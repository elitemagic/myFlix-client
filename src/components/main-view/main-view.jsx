import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";


export const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


  useEffect(() => {
    if (!token) return;
      
    fetch("https://my-flix-service.onrender.com/movies", {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => response.json())
    .then((movies) => {
      setMovies(movies);
      
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
      <>
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      <hr />
      <h2>Similar Movies:</h2>
        
        {similarMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onMovieClick={setSelectedMovie} />
        ))}
        
        <button style = {{ marginTop: "20px" }}
        onClick={() => { setUser(null); setToken(null); localStorage.clear();
        }}
        >Logout</button>
      </>
    );
  }
  
  

  if (movies.length === 0) {
    return (
      <>
      <button
      onClick={() => {
        setUser(null);
      }}
      >Logout</button>
      <div>The list is empty</div>;
      </>
    );
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
      <button style = {{ marginTop: "20px" }}
      onClick={() => { setUser(null); setToken(null); localStorage.clear();
      }}
      >
      Logout
      </button>
    </div>
  );
};