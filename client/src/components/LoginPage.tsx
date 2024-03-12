import './stylesheets/LoginPage.css'
import { NavLink } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";
import React, { ReactNode } from 'react';
import LoginSquare from './LoginSquare';

const LoginPage: React.FC = () => {
    const signInMess = "Log in to";
    const appName = "ReviewTool";

  return (
    <Container className='start-page-container'>
      <div className='login-text-container'>
        <p className='signinto'>{signInMess}</p>
        <p className='app-name'>{appName}</p>
      </div>        
      <LoginSquare />
        
    </Container>

  );
};

export default LoginPage;