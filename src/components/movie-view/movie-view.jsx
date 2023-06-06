import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, CardGroup } from "react-bootstrap";
import { BsHeart, BsHeartFill } from "react-icons/bs";

import "./movie-view.scss";

export const MovieView = ({ movies, favoriteMovies, setFavoriteMovies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const isFavorite = favoriteMovies && favoriteMovies.includes(movieId);

  const addToFavorites = (movieId) => {
    if (Array.isArray(favoriteMovies) && favoriteMovies.includes(movieId)) {
      alert(`${movie.title} is already in your favorites.`);
      return;
    }

    fetch(
      `https://my-flix-service.onrender.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((resJSON) => {
        alert(`${movie.title} was added to favorites.`);
        setFavoriteMovies((prevFavoriteMovies) => [
          ...prevFavoriteMovies,
          movieId,
        ]);
      })
      .catch((error) => {
        alert("Error adding movie to favorites");
        console.log(error);
      });
  };

  const removeFromFavorites = (movieId) => {
    if (!token) {
      return;
    }
    fetch(
      `https://my-flix-service.onrender.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((resJSON) => {
        alert(`${movie.title} removed from favorites`);
        setFavoriteMovies((prevFavoriteMovies) =>
          prevFavoriteMovies.filter((id) => id !== movieId)
        );
      })
      .catch((error) => {
        alert("Error removing movie from favorites");
        console.log(error);
      });
  };

  return (
    <>
      <Container
        className="movie-view-container"
        style={{
          position: "relative",
          margin: "25px auto",
          width: "80%",
          height: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${movie.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
            opacity: 0.15,
          }}
        ></div>
        <Row className="d-flex flex-row justify-content-center p-4">
          <Col>
            <h1 className="my-5 text-center">
              <span>{movie.title}</span>
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="align-self-end mb-4 ">
              <span>Director: </span>
              <span>{movie.director}</span>
            </h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="align-self-end mb-4 ">
              <span>Genre: </span>
              <span>{movie.genre}</span>
            </h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="mb-4">
              <h3 className="text-decoration-underline mb-2">Description: </h3>

              <h4>{movie.description}</h4>
            </div>
          </Col>
        </Row>
        <>
          <Container
            style={{
              position: "absolute",
              bottom: 0,
              width: "90%",
              paddingBottom: "5px",
            }}
          >
            <Row className="d-flex justify-content-center">
              <Button
                as={Link}
                to="/"
                variant="success"
                style={{
                  width: "50%",
                  padding: "5px",
                  marginRight: "25px",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Back
              </Button>

              <Button
                variant={isFavorite ? "success" : "success"}
                style={{
                  width: "20%",
                  padding: "5px",
                  marginLeft: "5px",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={
                  isFavorite
                    ? () => removeFromFavorites(movie.id)
                    : () => addToFavorites(movie.id)
                }
              >
                {isFavorite ? <BsHeartFill /> : <BsHeart />}
              </Button>
            </Row>
          </Container>
        </>
      </Container>
    </>
  );
};
