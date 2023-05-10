import { createContext } from "react";

const ImagePreloadContext = createContext({
  imagesLoaded: false,
  value: null,
});

export default ImagePreloadContext;
