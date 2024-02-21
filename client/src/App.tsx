import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateReview from './components/CreateReview';
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
            <Route path="/create" element={<CreateReview />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;
