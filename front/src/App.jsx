import React from "react";
import logo from "./logo.svg";
import { Counter } from "./store/features/counter/Counter";
import "./App.css";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

export default App;
