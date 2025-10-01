import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import SoundDetails from "./components/SoundDetails/SoundDetails.jsx";
import "./App.css";
import SoundNew from "./components/SoundDetails/SoundNew/SoundNew.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sounds/:soundId" element={<SoundDetails />} />
        <Route path="/sounds/" element={<SoundNew />} />
      </Routes>
    </>
  );
}

export default App;
