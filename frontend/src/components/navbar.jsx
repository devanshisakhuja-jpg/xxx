import { Link } from "react-router-dom";

const styles = `
  .navbar {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 28px;
    background: #ffffff;
    border-bottom: 3px solid #c8102e;
    font-family: Arial, Helvetica, sans-serif;
  }

  .navbar .brand {
    font-size: 20px;
    font-weight: bold;
    color: #000000;
  }

  .navbar .nav-links {
    display: flex;
    gap: 26px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .navbar .nav-links a {
    color: #000000;
    text-decoration: none;
    font-size: 15px;
    padding-bottom: 4px;
    border-bottom: 2px solid transparent;
    transition: color 0.15s ease, border-color 0.15s ease;
  }

  .navbar .nav-links a:hover {
    color: #c8102e;
    border-bottom-color: #c8102e;
  }
`;

export default function Navbar() {
  return (
    <>
      <style>{styles}</style>
      <nav className="navbar">
        <div className="brand">SpiderManToDo</div>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/statistics">Statistics</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </>
  );
}