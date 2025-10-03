import { Link } from "react-router";
import { UserContext } from "../../context/UserContext.jsx";
import { useContext } from "react";
import "./NavBar.css";

function NavBar() {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav className="navbar" id="main-navbar">
      {user ? (
        <div className="nav-links">
          <div className="left-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </div>
          <div className="right-links">
            <Link to={`/users/${user._id}`} className="nav-link">
              Profile
            </Link>
            <Link to="/sounds" className="nav-link">
              New Sounds
            </Link>
            <Link to="/" className="nav-link" onClick={handleSignOut}>
              Sign Out
            </Link>
            {/* <Link to="/sounds/:soundId" className="nav-link">
              Sound Details
            </Link> */}
          </div>
        </div>
      ) : (
        <div className="nav-links">
          <div className="left-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </div>
          <div className="right-links">
            <Link to="/sign-up" className="nav-link">
              sign-up
            </Link>
            <Link to="/sign-in" className="nav-link">
              sign-in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
