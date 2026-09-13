import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Folder structure ke exact relative paths:
import LandingPage from "./pages/LandingPage";
import Login from "./pages/login";
import SpidermanTodo from "./pages/spidermantodo";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default URL path "/" par Landing Page dikhega */}
        <Route path="/" element={<LandingPage />} />

        {/* Path "/login" par Login Page dikhega */}
        <Route path="/login" element={<Login />} />

        {/* Path "/home" par Spiderman Todo Page dikhega */}
        <Route path="/home" element={<SpidermanTodo />} />
      </Routes>
    </BrowserRouter>
  );
}