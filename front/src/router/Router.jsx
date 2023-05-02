import { createBrowserRouter } from "react-router-dom";
import App from "App";
import Main from "pages/Main";
import GameJump from "pages/GameJump";
import GameSleigh from "pages/GameSleigh";
import GameBubble from "pages/GameBubble";
import GameTrain from "pages/GameTrain";
import Books from "pages/Books";
import Tutirial from "pages/Tutirial";

const route = createBrowserRouter([
  {
    path: `/`,
    element: <App />,
    children: [
      {
        path: `/`,
        element: <Main />,
      },
      {
        path: `books`,
        element: <Books />,
      },
      {
        path: `jump`,
        element: <GameJump />,
      },
      {
        path: `sleigh`,
        element: <GameSleigh />,
      },
      {
        path: `train`,
        element: <GameTrain />,
      },
      {
        path: `bubble`,
        element: <GameBubble />,
      },
      {
        path: `tutorial`,
        element: <Tutirial />,
      },
    ],
  },
]);

export default route;
