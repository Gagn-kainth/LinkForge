import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Snip<span className="navbar-brand-dot">.</span>
      </Link>

      {isLoggedIn ? (
        <div className="navbar-user">
          <span className="navbar-email">{user.email}</span>
          <button className="navbar-link-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      ) : (
        <div className="navbar-user">
          <Link to="/login" className="navbar-link-btn">
            Log in
          </Link>
          <Link to="/signup" className="navbar-signup">
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
}
