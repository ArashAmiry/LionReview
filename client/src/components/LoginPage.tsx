import React from 'react';
import './stylesheets/LoginPage.css'
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

const StaticTextComponent: React.FC = () => {
    const signInMess = "Sign in to";
    const appName = "ReviewTool";

  return (
    <div className='login-text-container'>
        <p className='signinto'>{signInMess}</p>
        <p className='app-name'>{appName}</p>
        <Nav.Link as={NavLink} to="/myReviews">My Reviews</Nav.Link>
    </div>

  );
};

export default StaticTextComponent;