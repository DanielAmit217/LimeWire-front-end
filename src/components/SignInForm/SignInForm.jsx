import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../../services/authService";
import { UserContext } from "../../context/UserContext.jsx";
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
      <h2>Sign in to your account</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-component">
          <label>Username:</label>
          <input
            type="text"
            value={formData.username}
            name="username"
            autoComplete="username"
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={formData.password}
            name="password"
            autoComplete="current-password"
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          <div className="buttons">
            <div className="button">
              <button type="submit">Sign In</button>
            </div>
            <div className="button">
              <button type="button" onClick={() => navigate("/")}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
