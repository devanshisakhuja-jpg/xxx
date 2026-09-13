import { BrowserRouter, Routes, Route } from "react-router-dom";

// Adjust these two paths to wherever you've actually saved the files.
// I'm assuming both sit in a src/pages folder (matching Login's
// "../components/Navbar" import, which implies pages/ + components/ as siblings).
import Login from "./pages/login";
import SpidermanTodo from "./pages/spidermantodo";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<SpidermanTodo />} />
      </Routes>
    </BrowserRouter>
  );
}