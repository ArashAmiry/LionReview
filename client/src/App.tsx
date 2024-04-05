import { BrowserRouter as Router, Route, Routes, useLocation  } from "react-router-dom";
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
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import ReviewDetails from "./pages/ReviewDetails";
import { useEffect, useState } from "react";
import AfterParticipation from "./pages/AfterParticipation";
import NotFound from "./pages/NotFound";

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
  };
  
  const setLightModeTheme = () => {
    localStorage.setItem('default-theme', 'light');
    document.documentElement.classList.remove('dark-mode');
    const htmlElement = document.documentElement;
    htmlElement.removeAttribute('data-bs-theme');
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
      <AuthProvider>
        <div className="App">
          <Header isDarkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/logIn" element={<LoginPage />} />
            <Route path="/signUp" element={<SignupPage />} />
            <Route path="/create" element={
              <PrivateRoute>
                <CreateReview isDarkMode={darkMode}/>
              </PrivateRoute>
            }
            />
            <Route path="/activated" element={<AfterActivation />} />
            <Route path="/emailSent" element={<EmailSent />} />
            <Route path="/answer/:reviewId" element={<RespondentReview />} />
            <Route path="/myReviews" element={
              <PrivateRoute>
                <MyReviews username={"username"} />
              </PrivateRoute>
            } />
            <Route path="/myReviews/:reviewId" element={<ReviewDetails isDarkMode={darkMode}/>} />
            <Route path='*' element={<NotFound />}/>
            <Route path="/thanks" element={<AfterParticipation />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
