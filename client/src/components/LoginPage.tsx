import './stylesheets/LoginPage.css'
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import React, { ReactNode } from 'react';

interface LoginPageProps {
  children: ReactNode;
}

const LoginPage: React.FC<LoginPageProps> = ({children}) => {
    const signInMess = "Sign in to";
    const appName = "ReviewTool";

  return (
    <div className='start-page-container'>
      <div className='login-text-container'>
        <p className='signinto'>{signInMess}</p>
        <p className='app-name'>{appName}</p>
      </div>        
      {children}
        
    </div>

  );
};

export default LoginPage;