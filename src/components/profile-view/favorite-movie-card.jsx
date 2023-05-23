import React from "react";

export const FavoriteMovieCard = ({ favoriteMovies, movies }) => {
  return (
    <div className="favorite-movie-card">
      <h2>Favorite Movies</h2>
      {favoriteMovies.length > 0 ? (
        <ul>
          {favoriteMovies.map((movieId) => {
            const movie = movies.find((m) => m.id === movieId);
            return <li key={movieId}>{movie?.title}</li>;
          })}
        </ul>
      ) : (
        <p>No favorite movies available.</p>
      )}
    </div>
  );
};
