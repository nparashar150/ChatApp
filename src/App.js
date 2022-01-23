import './styles/App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ChatPage from './pages/ChatPage/ChatPage';
import LoginPage from './pages/LoginPage/LoginPage';
import DownloadPage from './pages/DownloadPage/DownloadPage';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/authContext';
import UserProfile from './pages/UserProfile/UserProfile';
import LoadingLanding from './components/Shared/Spinner/LoadingLanding';

function App() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      {loading ? (
        <LoadingLanding />
      ) : (
        <Router>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/about" element={<AboutPage />} />
            <Route exact path="/download" element={<DownloadPage />} />
            <Route
              exact
              path="/dashboard"
              element={user ? <ChatPage /> : <Navigate to="/" />}
            />
            <Route exact path="/profile" element={<UserProfile />} />
            <Route
              exact
              path="/login"
              element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
            />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
