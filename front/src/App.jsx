import LoadingComponent from "components/common/LoadingComponent";
import React from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  console.log("a");

  return (
    <React.Suspense fallback={<LoadingComponent />}>
      <div className="mx-auto h-screen w-screen flex text-center">
        <Outlet />
      </div>
    </React.Suspense>
  );
};

export default App;
