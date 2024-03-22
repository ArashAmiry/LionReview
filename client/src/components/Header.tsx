import { Container, Button, Image, Row, Col, Navbar, Nav } from "react-bootstrap";
import img from "../images/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import './stylesheets/Header.css';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const logOut = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    await axios.delete('http://localhost:8080/auth/logOut')
      .catch(function (error) {
        console.log(error);
      });
    navigate('/');
  };

  return (
    <Navbar bg="light" data-bs-theme="light" className="navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/"><Image width={50} src={img} /></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/create">Create Review Session</Nav.Link>
          <Nav.Link as={NavLink} to="/myReviews">My Reviews</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={NavLink} to="/logIn" className="mx-2">Log In</Nav.Link>
          <Nav.Link onClick={(e) => logOut(e)} className="mx-2">Log Out</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
