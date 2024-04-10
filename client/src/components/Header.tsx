import { Container, Image, Navbar, Nav } from "react-bootstrap";
import img from "../images/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import './stylesheets/Header.css';
import axios from 'axios';
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useAuthContext } from "../AuthContext";


type HeaderProps = {
  isDarkMode: boolean,
  toggleDarkMode: () => void
}

const Header = ({isDarkMode, toggleDarkMode} : HeaderProps) => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();

  const logOut = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    await axios.delete(`${process.env.REACT_APP_API_URL}/auth/logOut`)
      .catch(function (error) {
        console.log(error);
      });

    setIsLoggedIn(false);
    navigate('/');
  };


  return (
    <Navbar className="navbar bg-body">
      <Container>
        <Navbar.Brand as={NavLink} to="/"><Image width={50} src={img} className={isDarkMode ? 'white-image' : ''} /></Navbar.Brand>
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
        <Nav className="justify-content-end">
          <Nav.Item>
            <DarkModeSwitch
              style={{}}
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={40}
              />
          </Nav.Item>
       </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
