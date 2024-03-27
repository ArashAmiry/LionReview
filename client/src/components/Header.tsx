import { Container, Image, Navbar, Nav } from "react-bootstrap";
import img from "../images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import './stylesheets/Header.css';
import axios from 'axios';
import { useAuthContext } from "../AuthContext";


const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();

  const logOut = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    await axios.delete('http://localhost:8080/auth/logOut')
      .catch(function (error) {
        console.log(error);
      });

    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Navbar bg="light" data-bs-theme="light" className="navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/"><Image width={50} src={img} /></Navbar.Brand>
        <Nav className="me-auto">
        {isLoggedIn && (<>
          <Nav.Link as={NavLink} to="/create">Create Review Session</Nav.Link>
          <Nav.Link as={NavLink} to="/myReviews">My Reviews</Nav.Link></>)}
        </Nav>
        <Nav>
          {isLoggedIn ?
            (<Nav.Link onClick={(e) => logOut(e)} className="mx-2">Log Out</Nav.Link>) :
            (<Nav.Link as={NavLink} to="/logIn" className="mx-2">Log In</Nav.Link>)
          }
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
