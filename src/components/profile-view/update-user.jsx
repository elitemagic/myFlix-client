import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const UpdateUser = ({ user, token, onUpdateUser, onClose }) => {
  // State variables for the updated user details
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday || "");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the updated user object
    const updatedUser = {
      ...user,
      Username: username,
      Email: email,
      Birthday: birthday,
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
          // Handle other types of errors
        }
      });

    // Call the onUpdateUser function with the updated user object
    onUpdateUser(updatedUser);
  };

  // Function to handle form cancellation
  const handleCancel = () => {
    onClose();
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <Form onSubmit={handleSubmit}>
        {/* Form fields for updating username, email, and birthday */}
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
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        {/* Buttons for submitting the form or canceling */}
        <Button variant="primary" type="submit">
          Update
        </Button>{" "}
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};
