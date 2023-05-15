import { useState } from "react";

import {
  Card,
  Col,
  Form,
  Button,
  Container,
  Row,
  ButtonToolbar,
} from "react-bootstrap";

import { UpdateUser } from "./update-user.jsx";

export const ProfileView = ({ user, token, onLoggedOut }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleUpdate = () => {
    setShowUpdateForm(true);
  };

  const handleUpdateClose = () => {
    setShowUpdateForm(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username,
      password,
      email,
      birthdate,
    };

    fetch(`https://my-flix-service.onrender.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Updating user data failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully updated user data");
          handleUpdateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const deleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      fetch(`https://my-flix-service.onrender.com/users/${user.Username}`, {
        method: "DELETE",
        // headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.ok) {
            alert("Your account has been deleted. Good Bye!");
            handleLogout();
          } else {
            alert("Could not delete account");
          }
        })
        .catch((e) => {
          alert(e);
        });
    }
  };

  return (
    <Container className="my-3">
      <Row>
        <h1 className="mb-4 justify-content-between">
          {user.Username}'s Profile
        </h1>
      </Row>
      <Row className="mb-4">
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
      </Row>
      {showUpdateForm && (
        <UpdateUser
          user={user}
          token={token}
          onUpdateUser={() => {}}
          onClose={handleUpdateClose}
        />
      )}
      {!showUpdateForm && (
        <Row>
          <Col md={2}>
            <Button
              variant="primary"
              onClick={handleUpdate}
              className="w-100 mb-2"
            >
              Update Your Profile
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
          <Col md={2}>
            <Button
              variant="warning"
              onClick={handleLogout}
              className="w-100 mb-2"
            >
              Log Out
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};
