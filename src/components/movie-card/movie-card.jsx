// Here you import the PropTypes library
import PropTypes from "prop-types";



export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div 
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      birth: PropTypes.string,
      death: PropTypes.string
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};

