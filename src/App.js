import "./styles/App.scss";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/authContext";
import UserProfile from "./pages/UserProfile/UserProfile";
import { signInStatus } from "./firebase";

function App() {
  const { user, dispatch } = useContext(AuthContext);
  
  useEffect (() => {
    console.log("Checking SignInStatus");
    signInStatus(dispatch);
  }, [dispatch]);
  
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={user ? (<Navigate to="/dashboard" />) : (<LandingPage />)} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/dashboard" element={user ? (<ChatPage />) : (<Navigate to="/" />)} />
          <Route exatt path="/profile" element={ <UserProfile /> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
