import LoadingComponent from "components/common/LoadingComponent";
import React from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { commonActions } from "store/features/common/commonSlice";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const naviagation = useNavigate();

  console.log(naviagation);

  window.backPress = () => {
    if (location.pathname === "/main" && window.appManager) {
      window.appManager.onCloseApp();
    } else if (
      location.pathname === "/sleigh" ||
      location.pathname === "/jump" ||
      location.pathname === "/bubble" ||
      location.pathname === "/train"
    ) {
      dispatch(commonActions.setWarning());
    } else {
      naviagation(-1);
    }
  };

  return (
    <React.Suspense fallback={<LoadingComponent />}>
      <div className="mx-auto h-screen w-screen flex text-center">
        <Outlet />
      </div>
    </React.Suspense>
  );
};

export default App;
