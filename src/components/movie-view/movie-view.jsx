// import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, CardGroup } from "react-bootstrap";

import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const addToFavorites = (movieId) => {
    if (!token) {
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
        alert("Movie removed from favorites");
        console.log(resJSON);
      })
      .catch((error) => {
        alert("Error removing movie from favorites");
        console.log(error);
      });
  };

  return (
    <>
      <Container
        style={{
          position: "relative",
          width: "50%",
          height: "auto",
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
            backgroundSize: "contain",
            opacity: 0.2,
          }}
        ></div>
        {/* <Row className="d-flex flex-row-reverse justify-content-center">
        <img src={movie.image} style={{ width: "50%", height: "auto" }} />
      </Row> */}
        <Row className="d-flex flex-row justify-content-center p-4">
          <h1 className="my-0 text-center">
            <span>{movie.title}</span>
          </h1>
        </Row>
        <Row>
          <h3 className="align-self-end mb-2 ">
            <span>Director: </span>
            <span>{movie.director}</span>
          </h3>
        </Row>
        <Row>
          <h3 className="align-self-end mb-2 ">
            <span>Genre: </span>
            <span>{movie.genre}</span>
          </h3>
        </Row>
        <Row>
          <div className="mb-4">
            <h3 className="text-decoration-underline mb-2">Description: </h3>

            <span>{movie.description}</span>
          </div>
        </Row>
      </Container>

      <Container
        style={{
          position: "relative",
          width: "50%",
          height: "auto",
        }}
      >
        <Row className="d-flex justify-content-center">
          <Link to={"/"}>
            <Button
              variant="success"
              style={{
                width: "100%",
                padding: "5px",
                zIndex: 1,
              }}
            >
              Back
            </Button>
          </Link>
        </Row>
        <Row className="d-flex justify-content-center">
          <Button
            variant="primary"
            style={{
              width: "100%",
              padding: "5px",
              zIndex: 1,
            }}
            onClick={() => addToFavorites(movie.id)}
          >
            Add to Favorites
          </Button>
        </Row>
        <Row className="d-flex justify-content-center">
          <Button
            variant="success"
            style={{
              width: "100%",
              padding: "5px",
              zIndex: 1,
            }}
            onClick={() => removeFromFavorites(movie.id)}
          >
            Remove from Favorites
          </Button>
        </Row>
      </Container>
    </>
  );
};
