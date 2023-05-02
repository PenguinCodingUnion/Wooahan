import React from "react";
import logo from "./logo.svg";
import { Counter } from "./store/features/counter/Counter";
import "./App.css";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="mx-auto h-screen w-screen flex text-center">
      <Outlet />
    </div>
  );
};

export default App;
