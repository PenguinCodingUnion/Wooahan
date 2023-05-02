import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="mx-auto h-screen w-screen flex">
      <Outlet />
    </div>
  );
};

export default App;
