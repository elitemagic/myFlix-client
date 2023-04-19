import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
// import { LoginView } from "../login-view/login-view";


export const MainView = () => {

  const [user, setUser] = useState(storedUser? storedUser : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
      fetch("https://https://my-flix-service.onrender.com/movies.json")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.docs.map((doc) => {
          return {
            id: doc.key,
            title: doc.title,
          };
        });

        setMovies(moviesFromApi);
      });
    }, []);

    if (selectedMovie) {
      return (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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
      onClick={() => { setUser(null)}}
      >
      Logout
      </button>
    </div>
  );
};