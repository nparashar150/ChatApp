import "./styles/App.scss";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ChatPage from "./pages/ChatPage/ChatPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/dashboard" element={<ChatPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
