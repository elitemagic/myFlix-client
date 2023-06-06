import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { UpdatePassword } from "./update-password";

export const UpdateUser = ({ user, token, onUpdateUser, onClose }) => {
  // State variables for the updated user details
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [birthdate, setBirthdate] = useState(user.Birthdate || "");

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the updated user object
    const updatedUser = {
      Username: username,
      Email: email,
      Birthdate: birthdate,
    };

    fetch(`https://my-flix-service.onrender.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(updatedUser),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Updating user data failed");
        }
      })
      .then((user) => {
        alert("Successfully updated user data");
        onUpdateUser(user);
        onClose();
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.error("Invalid JSON response from the server");
        } else {
          console.error("Error updating user data:", error.message);
        }
      });
  };

  // Function to handle form cancellation
  const handleCancel = () => {
    onClose();
  };

  const handlePassword = () => {
    setShowPasswordForm(true);
  };

  if (showPasswordForm) {
    return (
      <UpdatePassword
        user={user}
        token={token}
        onUpdateUser={onUpdateUser}
        onClose={onClose}
      />
    );
  }

  console.log(user);

  return (
    <>
      <h2>Update {username}&apos;s Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthdate</Form.Label>
          <Form.Control
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </Form.Group>
        <Row className="mt-2">
          <Col md={2}>
            <Button variant="success" type="submit" className="w-100 mb-2">
              Update
            </Button>
          </Col>
          <Col md={2}>
            <Button
              variant="warning"
              onClick={handleCancel}
              className="w-100 mb-2"
            >
              Cancel
            </Button>
          </Col>
          <Col md={2}>
            <Button
              variant="secondary"
              onClick={handlePassword}
              className="w-100 mb-2"
            >
              Update Password
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
