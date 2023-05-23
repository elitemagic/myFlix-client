import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

import { FavoriteMovieCard } from "./favorite-movie-card";
import { UpdateUser } from "./update-user";

export const ProfileView = ({ user, token, onLoggedOut, setUser, movies }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const handleUpdate = () => {
    setShowUpdateForm(true);
  };

  const handleUpdateClose = () => {
    setShowUpdateForm(false);
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    setShowUpdateForm(false);
  };

  useEffect(() => {
    fetch(
      `https://my-flix-service.onrender.com/users/${user.Username}/favoriteMovies`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setFavoriteMovies(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, user.Username]);

  const deleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (confirmed) {
      fetch(`https://my-flix-service.onrender.com/users/${user.Username}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.ok) {
            alert("Your account has been deleted. Goodbye!");
            localStorage.clear(); // Clear localStorage
            window.location.replace("/signup"); // Redirect to the SignupView
          } else {
            alert("Could not delete account");
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <>
      {!showUpdateForm && (
        <Container className="my-3">
          <Row>
            <h1 className="mb-4 justify-content-between">
              {user.Username}'s Profile
            </h1>
          </Row>
          <Row className="mb-4">
            <Col>
              <p>
                <span className="font-weight-bold">Username: </span>
                {user.Username}
              </p>
              <p>
                <span className="font-weight-bold">Email: </span>
                {user.Email}
              </p>
              {user.Birthday && (
                <p>
                  <span className="font-weight-bold">Birthday: </span>
                  {new Date(user.Birthday).toLocaleDateString()}
                </p>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                {favoriteMovies.length > 0 && (
                  <div>
                    <FavoriteMovieCard
                      favoriteMovies={favoriteMovies}
                      movies={movies}
                    />
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <Button
                variant="primary"
                onClick={handleUpdate}
                className="w-100 mb-2"
              >
                Update Profile
              </Button>
            </Col>
            <Col md={2}>
              <Button
                variant="warning"
                onClick={onLoggedOut}
                className="w-100 mb-2"
              >
                Log Out
              </Button>
            </Col>
            <Col md={2}>
              <Button
                variant="danger"
                onClick={deleteAccount}
                className="w-100 mb-2"
              >
                Delete Account
              </Button>
            </Col>
          </Row>
        </Container>
      )}
      {showUpdateForm && (
        <UpdateUser
          user={user}
          token={token}
          onUpdateUser={handleUpdateUser}
          onClose={handleUpdateClose}
        />
      )}
    </>
  );
};
