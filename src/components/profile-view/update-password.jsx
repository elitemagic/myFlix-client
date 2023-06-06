import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export const UpdatePassword = ({ user, token, onUpdateUser, onClose }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedUser = {
      Username: user.Username,
      Password: password,
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
          throw new Error("Updating user password failed");
        }
      })
      .then((user) => {
        alert("Successfully updated user password");
        onUpdateUser(user);
        onClose();
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.error("Invalid JSON response from the server");
        } else {
          console.error("Error updating user password:", error.message);
        }
      });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <h2>Change {user.Username}&apos;s Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Row className="mt-4">
          <Col md={3}>
            <Button variant="success" type="submit" className="w-50 mb-2">
              Change Password
            </Button>
          </Col>
          <Col md={3}>
            <Button
              variant="warning"
              onClick={handleCancel}
              className="w-50 mb-2"
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
