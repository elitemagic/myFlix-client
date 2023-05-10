// import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, CardGroup } from "react-bootstrap";

import './movie-view.scss';

export const MovieView = ({ movies }) => {

  const { movieId } = useParams();
  
  const movie = movies.find((m) => m.id === movieId);

  return (
    <Container>
      <Row className='d-flex flex-row-reverse justify-content-center'>
         <img
            src={movie.image} style={{ width: "50%", height: "auto" }}/> 
      </Row>
      <Row className='d-flex flex-row justify-content-center p-4'>
  <h2 className='my-0 text-center'>
    <span>{movie.title}</span>
  </h2>
</Row>
      <Row>
        <h5 className='align-self-end mb-2 text-end'>
        <span>Director: </span>
        <span>{movie.director}</span>
        </h5>
      </Row>
      <Row>
        <h5 className='align-self-end mb-2 text-end'>
        <span>Genre: </span>
        <span>{movie.genre}</span>
        </h5>
      </Row>
      <Row>
        <div className='mb-4'>
        <div className='text-decoration-underline mb-2'>Description: </div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
      </Row>
      <Col className="text-center">
        <div className="my-4">
          <Link to={"/"}>
            <Button variant="outline-success" style={{ padding: "5px 100px" }}>Back</Button>
          </Link>
        </div>
      </Col>
    </Container>
  );
};


// Here is where we define all the props constraints for the MovieView
// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     genre: PropTypes.string.isRequired,
//     description: PropTypes.string,
//     director: PropTypes.string
//   })
// };

