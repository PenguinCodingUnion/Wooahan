import { createBrowserRouter } from "react-router-dom";
import App from "App";
import GameJump from "pages/GameJump";
import Main from "pages/Main";

const route = createBrowserRouter([
  {
    path: `/`,
    element: <App />,
    children: [
      {
        path: `jump`,
        element: <GameJump />,
      },
      {
        path: `main`,
        element: <Main />,
      },
    ],
  },
]);

export default route;
