import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Signin from "./Signin";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signing" element={<Signin />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
