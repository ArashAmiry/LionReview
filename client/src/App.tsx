import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateReview from "./pages/CreateReview";
import Header from "./components/Header";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import MyReviews from "./pages/MyReviews";
import RespondentReview from './pages/RespondentReview';
import SignupPage from './pages/SignUpPage';
import axios from 'axios';
import AfterActivation from "./pages/AfterActivation";
import EmailSent from "./pages/EmailSent";
import ReviewDetails from "./pages/ReviewDetails";

axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/logIn" element={<LoginPage />} />
              <Route path="/signUp" element={<SignupPage />} />
              <Route path="/create" element={<CreateReview />} />
              <Route path="/activated" element={<AfterActivation />} />
              <Route path="/emailSent" element={<EmailSent />} />
              <Route path="/answer/:reviewId" element={<RespondentReview />} />
              <Route path="/myReviews" element={<MyReviews username={"username"} />} />
              <Route path="/myReviews/:reviewId" element={<ReviewDetails />} />
            </Routes>

          </div>

    </Router>
  );
}

export default App;
