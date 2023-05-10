import React, { useState, useEffect } from "react";
import { Container, Form, Button, ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies, onUpdateUser, onDeleteUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Set the state with the current user's information
    setUsername(user.Username);
    setPassword(user.Password);
    setEmail(user.Email);
    setBirthdate(user.Birthdate);
    setFavoriteMovies(
      movies.filter((m) => user.FavoriteMovies.includes(m._id))
    );
  }, [user, movies]);

  const handleUpdate = (event) => {
    event.preventDefault();
    setIsEditing(false);

    // Call the onUpdateUser function passed as a prop with the updated user information
    onUpdateUser({
      Username: username,
      Password: password,
      Email: email,
      Birthdate: birthdate,
    });
  };

  const handleDelete = () => {
    // Call the onDeleteUser function passed as a prop
    onDeleteUser();
    history.push("/");
  };

  return (
    <Container>
      <h2>Profile</h2>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          {isEditing ? (
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          ) : (
            <Form.Control plaintext readOnly defaultValue={username} />
          )}
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          {isEditing ? (
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          ) : (
            <Form.Control plaintext readOnly defaultValue={password} />
          )}
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          {isEditing ? (
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <Form.Control plaintext readOnly defaultValue={email} />
          )}
        </Form.Group>

        <Form.Group controlId="formBirthdate">
          <Form.Label>Birthdate:</Form.Label>
          {isEditing ? (
            <Form.Control
              type="date"
              placeholder="Enter birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          ) : (
            <Form.Control plaintext readOnly defaultValue={birthdate} />
          )}
        </Form.Group>

        <Button variant="primary" onClick={() => setIsEditing(true)}>
          Edit
        </Button>{" "}
        {isEditing && (
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        )}{" "}
        {isEditing && (
          <Button variant="success" type="submit" onClick={handleUpdate}>
            Save
          </Button>
        )}
      </Form>
   </Container>
  );
};
