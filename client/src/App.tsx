import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateReviewForm from './components/CreateReviewForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CreateReviewForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
