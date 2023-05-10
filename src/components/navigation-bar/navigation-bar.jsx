import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Movie App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to={`/`} className="navbar-link">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to={`/login`} className="ms-lg-auto me-3">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to={`/signup`}>
                  Sign Up
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to={`/`} className="navbar-link">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to={`/users`}>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut} className="ms-lg-auto">
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
