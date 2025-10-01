import { Link } from "react-router";
function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          {/* <Link to="/" /> */}
          HOME
        </li>
        <li>
          {/* <Link to="/sign-in" /> */}
          SIGN IN
        </li>
        <li>
          {/* <Link to="/sign-up" /> */}
          SIGN UP
        </li>
        <li>
          <Link to="/new" />
          NEW
        </li>
      </ul>
      {console.log("hello")}
    </nav>
  );
}

export default NavBar;
