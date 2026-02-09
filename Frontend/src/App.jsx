import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Home";
import Register from "./Register";
import Signin from "./Signin";
import Dashboard from "./Dashboard";
import GoogleCallback from "./GoogleCallback";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signing" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
      </Routes>
    </div>
  );
};

export default App;
