import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { SearchBar } from "../search-bar/search-bar";

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {
  const location = useLocation();

  const isProfileView = location.pathname.includes("/users");
  const isLoginPage = location.pathname.includes("/login");
  const isSignupPage = location.pathname.includes("/signup");

  const showSearchBar = !isProfileView && !isLoginPage && !isSignupPage;

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
          {showSearchBar && (
            <Nav className="d-flex">
              <SearchBar onSearch={onSearch} />
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
