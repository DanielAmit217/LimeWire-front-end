import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

import { signUp } from "../../services/authService";

import { UserContext } from "../../context/UserContext.jsx";

import "./SignUpForm.css";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate("/");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <div className="signup-page">
      <div>
        <div>Limewire</div>
      </div>
      <h2>Sign Up!</h2>
      <h3>
        {" "}
        Already have an account? Sign-in<Link to="/sign-in"> Here</Link>
      </h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={isFormInvalid()}>
            Sign Up
          </button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
