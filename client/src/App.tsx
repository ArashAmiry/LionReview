import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import AddCodeLink from './components/AddCodeLink';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
        <Routes>
          <Route path="/" element={<AddCodeLink />} />
      <Route path="/create" element={<div>hej</div>}/>
        </Routes>
        </div>
        
      </div>
    </Router>
  );
}

export default App;
