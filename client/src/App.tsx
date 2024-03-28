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
import { useEffect, useState } from "react";

axios.defaults.withCredentials = true;

function App() {
  const isBrowserDefaultDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const localStorageTheme = localStorage.getItem('default-theme');
    if (((localStorageTheme !== null && localStorageTheme === 'dark')) || (localStorageTheme == null && isBrowserDefaultDark() && !darkMode)) {
        setDarkMode(true);
        setDarkModeTheme();
    }
  }, []);

  const setDarkModeTheme = () => {
    localStorage.setItem('default-theme', 'dark');
    document.documentElement.classList.add('dark-mode');
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-bs-theme', 'dark');
    console.log("Dark mode set");
  };
  
  const setLightModeTheme = () => {
    localStorage.setItem('default-theme', 'light');
    document.documentElement.classList.remove('dark-mode');
    const htmlElement = document.documentElement;
    htmlElement.removeAttribute('data-bs-theme');
    console.log("Light mode set");
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      if (newMode) {
        setDarkModeTheme();
      } else {
        setLightModeTheme();
      }
      return newMode;
    });
  };
  
  return (
    <Router>
      <div className="App">
        <Header isDarkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/logIn" element={<LoginPage />} />
              <Route path="/signUp" element={<SignupPage />} />
              <Route path="/create" element={<CreateReview isDarkMode={darkMode} />} />
              <Route path="/activated" element={<AfterActivation />} />
              <Route path="/emailSent" element={<EmailSent />} />
              <Route path="/answer/:reviewId" element={<RespondentReview />} />
              <Route path="/myReviews" element={<MyReviews username={"username"} />} />
              <Route path="/myReviews/:reviewId" element={<ReviewDetails isDarkMode={darkMode} />} />
            </Routes>

          </div>

    </Router>
  );
}

export default App;
