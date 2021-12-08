import "./styles/App.scss";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function App() {
  const { user } = useContext(AuthContext);
  
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={user ? (<Navigate to="/dashboard" />) : (<LandingPage />)} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/dashboard" element={user ? (<ChatPage />) : (<Navigate to="/" />)} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
