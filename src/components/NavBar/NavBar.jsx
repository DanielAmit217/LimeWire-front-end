import { Link } from "react-router";
import { UserContext } from "../../context/UserContext.jsx";
import { useContext } from "react";

function NavBar() {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav>
      {user ? (
        <ul>
          <li>Welcome {user.username}</li>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          </li>
          <li>
            <Link to="/sounds">New Sounds</Link>
          </li>
          <li>
            <Link to="/sounds/:soundId">Sound Details</Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/sign-up">sign-up</Link>
          </li>
          <li>
            <Link to="/sign-in">sign-in</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
