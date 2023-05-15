import React, { useState } from "react";
import { Card, Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

import { ProfileView } from "./profile-view";

export const UpdateUser = ({ user, token, onUpdateUser, onClose }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthdate, setBirthdate] = useState(user.Birthday);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: new Date(birthdate).toISOString().split("T")[0],
    };

    axios
      .put(
        `https://my-flix-service.onrender.com/users/${user.Username}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Updating user data failed");
        }
        return response.data();
      })
      .then((updatedUser) => {
        alert("Successfully updated user data");
        onUpdateUser(updatedUser);
        onClose();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleClose = () => {
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <Col md={6}>
      <Card className="mt-2 mb-3">
        <Card.Body>
          <Card.Title>Update your info</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="5"
                className="bg-light"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="5"
                className="bg-light"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-light"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Birthdate:</Form.Label>
              <Form.Control
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="bg-light"
              />
            </Form.Group>
            <Row className="mt-4">
              <Col>
                <Button variant="primary" type="submit" className="w-100 mb-1 ">
                  Save Changes
                </Button>
              </Col>
              <Col>
                <Button
                  variant="secondary"
                  onClick={handleClose}
                  className="w-100 mb-1"
                >
                  Close
                </Button>
              </Col>
              <Col>
                <Button
                  variant="warning"
                  onClick={handleLogout}
                  className="w-100 mb-1"
                >
                  Logout
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};
