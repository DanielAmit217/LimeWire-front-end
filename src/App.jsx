import { Route, Routes } from "react-router";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx"
import New from "../components/New/New";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/new" element={<New />} />
      </Routes>
    </>
  );
}

export default App;
