import { Routes, Route } from "react-router";
import SoundDetails from "./components/SoundDetails/SoundDetails.jsx";
import "./App.css";
import SoundNew from "./components/SoundNew/SoundNew.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Landing from "./components/Landing/Landing.jsx";
import { UserContext } from "./context/UserContext.jsx";
import { useContext } from "react";
import UserProfile from "./components/UserProfile/UserProfile.jsx";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        <Route path="/sounds/:soundId" element={<SoundDetails />} />
        <Route path="/sounds/" element={<SoundNew />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/users/:userId" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
