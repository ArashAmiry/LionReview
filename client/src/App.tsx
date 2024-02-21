import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateReview from './components/CreateReview';
import Header from './components/Header';
import CodePreviewPage from './components/CodePreview';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/create" element={<CreateReview />}/>
        </Routes>
        </div>
        
      </div>
    </Router>
  );
}

export default App;
