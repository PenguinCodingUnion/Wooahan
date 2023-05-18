import LoadingComponent from "components/common/LoadingComponent";
import { Howler } from "howler";
import React from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { commonActions } from "store/features/common/commonSlice";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const naviagation = useNavigate();

  window.backPress = () => {
    if (location.pathname === "/main" && window.appManager) {
      window.appManager.onCloseApp();
    } else if (
      location.pathname === "/sleigh" ||
      location.pathname === "/jump" ||
      location.pathname === "/bubble" ||
      location.pathname === "/train" ||
      location.pathname === "/tutorial" ||
      location.pathname === "/ending"
    ) {
      dispatch(commonActions.setWarning());
    } else {
      naviagation("/main");
    }
  };

  const findCurrentSounds = () => {
    const currentSounds = [];
    const { _howls } = Howler;

    for (const howlId in _howls) {
      const howl = _howls[howlId];
      currentSounds.push(howl);
    }

    return currentSounds;
  };

  window.soundPause = () => {
    const currentSounds = findCurrentSounds();
    currentSounds.forEach((sound) => {
      if (sound.playing()) {
        sound.stop();
      } else {
        sound.unload();
      }
    });
  };

  window.soundResume = () => {
    const currentSounds = findCurrentSounds();
    currentSounds.forEach((sound) => {
      sound.play();
    });
  };

  return (
    <React.Suspense fallback={<LoadingComponent />}>
      <div className="mx-auto h-screen w-screen flex text-center overflow-y-hidden">
        <Outlet />
      </div>
    </React.Suspense>
  );
};

export default App;
