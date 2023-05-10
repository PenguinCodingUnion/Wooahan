import { images } from "assets/images";
import LoadingComponent from "components/common/LoadingComponent";
import React from "react";
import { Outlet } from "react-router-dom";
import ImagePreloadProvider from "util/context/ImagePreloadProvider";

const App = () => {
  return (
    <React.Suspense fallback={<LoadingComponent />}>
      <ImagePreloadProvider imageUrls={images}>
        <div className="mx-auto h-screen w-screen flex text-center">
          <Outlet />
        </div>
      </ImagePreloadProvider>
    </React.Suspense>
  );
};

export default App;
