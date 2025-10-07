import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../../services/authService";
import { UserContext } from "../../context/UserContext.jsx";
import { Link } from "react-router";
import "./SignInForm.css";

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);

      setUser(signedInUser);
      navigate("/");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="signin-page">
      <div>
        <h1>Limewire</h1>
      </div>
      <h2>Sign In!</h2>
      <h3>
        Don’t have an account? Sign up
        <Link to="/sign-up"> Here</Link>
      </h3>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={formData.username}
            name="username"
            autoComplete="username"
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            name="password"
            autoComplete="current-password"
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit">Sign In</button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
