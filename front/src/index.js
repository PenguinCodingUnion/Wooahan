import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import route from "./router/Router";
import ImagePreloadProvider from "util/context/ImagePreloadProvider";
import { images } from "assets/images";

const container = document.getElementById("root");
const root = createRoot(container);
window.doJump = () => {
  console.log(`not claim function`);
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ImagePreloadProvider imageUrls={images}>
        <RouterProvider router={route} />
      </ImagePreloadProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
