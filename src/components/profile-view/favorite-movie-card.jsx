import React from "react";
import { Link } from "react-router-dom";

export const FavoriteMovieCard = ({ favoriteMovies, movies }) => {
  return (
    <div className="favorite-movie-card">
      <h2>Favorite Movies</h2>
      {favoriteMovies.length > 0 ? (
        <ul>
          {favoriteMovies.map((movieId) => {
            const movie = movies.find((m) => m.id === movieId);
            return (
              <li key={movieId}>
                <Link to={`/movies/${movieId}`}>{movie?.title}</Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No favorite movies available.</p>
      )}
    </div>
  );
};
