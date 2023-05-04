import{ useState } from "react";
import { Container, Row, Col, Button, Card, CardGroup, Form } from "react-bootstrap";


export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    };

    fetch("SIGNUP_URL", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => {
        if (response.ok) {
            alert("Signup successful");
            window.location.reload();
        } else {
            alert("Signup failed");
        }
    });
    }   


  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card style={{marginTop: 50, marginBottom:25, width:370}}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontSize: 18}}>...not a member?  please register below</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Enter username"
                      minLength="3" 
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                        required
                      placeholder="Enter password"
                      minLength="8" 
                    />
                  </Form.Group>

                  <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="Date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.vale)}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Sign Up
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};