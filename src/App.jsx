import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Landingpage";
import Login from "./pages/login";
import SpiderManTodo from "./pages/spidermantodo";
import QuestDo from "./pages/spid";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Spider-Man To-Do Home Page */}
        <Route path="/home" element={<SpiderManTodo />} />

        {/* QuestDo Page */}
        <Route path="/QuestDo" element={<QuestDo />} />

        {/* If URL doesn't match, go to QuestDo */}
        <Route path="*" element={<QuestDo />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App; 