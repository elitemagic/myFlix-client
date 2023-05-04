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
      <Row className='d-flex flex-row-reverse p-3'>
         <img
            src={movie.image}
            className="w-100" />   
        <Col md={12} className='align-self-end mb-2 text-end'>
          <Row className='d-flex flex-row  justify-content-between'>
            <Col md={9} className='d-flex flex-column'>
              <h3 className='my-0'>
              <span>Title: </span>
              <span>{movie.title}</span>
              </h3></Col>
              <Col>
              <h5 className='align-self-end mb-2 text-end'>
              <span>Director: </span>
              <span>{movie.director}</span>
              </h5>
            </Col>
            <Col md={9} className='align-self-end mb-2 text-end'>
              <span>Genre: </span>
              <span>{movie.genre}</span>
            </Col>
          </Row>
            <div className='mt-md-5 mb-4'>
            <div className='text-decoration-underline mb-2'>Description: </div>
              <span>Description: </span>
              <span>{movie.description}</span>
            </div>
          
            <Link to={"/"}>
        <Button className="back-button">Back</Button>
      </Link>
        </Col>
      </Row>
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

