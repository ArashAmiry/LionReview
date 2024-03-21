import { Container, Button, Image, Row, Col, Navbar, Nav } from "react-bootstrap";
import img from "../images/logo.png";
import { NavLink } from "react-router-dom";
import './stylesheets/Header.css';
const Header = () => {
    return (
        <Navbar bg="light" data-bs-theme="light" className="navbar">
        <Container>
          <Navbar.Brand as={NavLink} to="/"><Image src={img}/></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/create">Create Review Session</Nav.Link>
            <Nav.Link as={NavLink} to="/myReviews">My Reviews</Nav.Link>
            <Nav.Link as={NavLink} to="/Templates">Templates</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/logIn" className="mx-2">Log In</Nav.Link>
          </Nav>
        </Container>
      </Navbar> 
    );
}

export default Header;
