import React from 'react';
import logo from './logo.svg';
import { Nav } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateReview from './components/CreateReview';
import Header from './components/Header';
import LoginSquare from './components/LoginSquare';
import StartPage from './components/StartPage'
import LoginPage from './components/LoginPage'
import Background from './components/Background';
import FormsStartPage from './components/FormsStartPage';
import PopulateForms from './components/PopulateForms';
import RespondentReview from './components/RespondentReview';

function App() {
  return (
    <Router>
      <div className="App">

        <Header />
        <Background>
        <div className="content">
        <Routes>
          <Route path="/" element={<header className="App-header"> 
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>} />
      <Route path = "/logIn" element = {<div> <LoginPage> <LoginSquare /> </LoginPage>  </div>}/>
      <Route path="/create" element={<CreateReview />}/>
      <Route path="/answer/:reviewId" element={<RespondentReview />}/>
      <Route path = "/myReviews" element = {<div> <FormsStartPage ><PopulateForms/></FormsStartPage> </div>}/>
        </Routes>
      
        </div>
      </Background>
      </div>
      
    </Router>
  );
}

export default App;
