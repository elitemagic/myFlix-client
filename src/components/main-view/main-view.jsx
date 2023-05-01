import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Container, Row, Col, Button, Card, CardGroup, Form } from "react-bootstrap";

import './main-view.scss';


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
      headers: { Authorization: `Bearer ${token}` }
    })
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
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={4}>
          <LoginView onLoggedIn={(user) => setUser(user)} />
          <br></br>
          <SignupView />
        </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : selectedMovie ? (
        <Col md={4} style={{ border: "1px solid black" }} >
          <MovieView
            
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
        ) : (
        <>          
          {movies.map((movie) => (
            <Col className="mb-4" key={movie.id} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
          <Row>
            
              <Button
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
              >
                Logout!
              </Button>
            
          </Row>
        </>
        )}
      </Row>
  )
  

  // if (!user) {
  //   return (
  //     <>
  //       <LoginView onLoggedIn={(user, token) => {
  //         setUser(user);
  //         setToken(token);
  //       }} />
  //       or
  //       <SignupView />
  //     </>
  //   );
  // }

  // if (selectedMovie) {
  //   const similarMovies = movies.filter(movie => movie.genre === selectedMovie.genre && movie.title !== selectedMovie.title)
  //   return (
  //     <div>
  //     <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
  //     <hr />
  //     <h2>Movie of shared genre:</h2>
        
  //       {similarMovies.map(movie => (
  //         <MovieCard key={movie.id} movie={movie} onMovieClick={setSelectedMovie} />
  //       ))}
  //     </div>
  //   );
  // }
  
  

  // if (movies.length === 0) {
  //   return <div>The list is empty</div>;
  // }

  // return (
  //   <div>
  //     {movies.map((movie) => (
  //       <MovieCard 
  //         key={movie.id}
  //         movie={movie}
  //         onMovieClick={(newSelectedMovie) => {
  //           setSelectedMovie(newSelectedMovie);
  //         }}
  //       />
  //     ))}
      
  //     <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>

  //   </div>
  // );
};

