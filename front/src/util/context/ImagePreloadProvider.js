import React from "react";
import ImagePreloadContext from "./ImagePreloadContext";
import usePreloadImages from "util/hooks/usePreloadImages";

const ImagePreloadProvider = ({ children, imageUrls }) => {
  const imagesLoaded = usePreloadImages(imageUrls);

  return (
    <ImagePreloadContext.Provider value={{ imagesLoaded }}>
      {children}
    </ImagePreloadContext.Provider>
  );
};

export default ImagePreloadProvider;
