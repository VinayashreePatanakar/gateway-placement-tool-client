import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FloorSelection from "./pages/FloorSelection/FloorSelection";
import Home from "./pages/Home/Home/Home";

function App() {
  return (
    <Router>
      <header style={{ padding: "1rem", background: "#f5f5f5" }}>
        <h1>Welcome to My App</h1>
      </header>

      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<FloorSelection />} />
          <Route path="/gateway-placement" element={<Home />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
