import PropTypes from "prop-types";
import { Container, Row, Col, Button, Card, CardGroup } from "react-bootstrap";

import './movie-view.scss';



export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img
          src={movie.image}
          className="w-100" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      
      <Button
        variant="primary"
        type="submit"
        onClick={onBackClick}
        style={{ cursor: "pointer" }}
        >Back
      </Button>
    </div>
  );
};

// Here is where we define all the props constraints for the MovieView
MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    description: PropTypes.string,
    director: PropTypes.string
  }).isRequired
};

