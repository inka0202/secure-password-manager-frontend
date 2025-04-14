import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import AboutUs from "./pages/AboutUs";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/aboutUs" element={<AboutUs />} />
    </Routes>
  );
}

export default App;
