import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${encodeURIComponent(movie.id)}`} className="card-link">
      <Card style={{ height: "400px" }} className="border-0" bg="Honeydew">
        <Card.Img
          variant="top"
          src={movie.image}
          style={{ objectFit: "contain", height: "80%", width: "100%" }}
        />{" "}
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title
            className="text-center my-3"
            style={{ textDecoration: "none", color: "black" }}
          >
            {movie.title}
          </Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.string,
    description: PropTypes.string,
    director: PropTypes.string,
  }).isRequired,
};
