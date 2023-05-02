import { createBrowserRouter } from "react-router-dom";
import App from "App";
import Main from "pages/Main";
import GameSleigh from "pages/GameSleigh";
import GameBubble from "pages/GameBubble";
import GameTrain from "pages/GameTrain";
import Books from "pages/Books";
import GameEnding from "pages/GameEnding";

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
        async lazy() {
          let { GameJump } = await import(`pages/GameJump`);
          return {
            Component: GameJump,
          };
        },
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
        path: `ending`,
        element: <GameEnding />,
      },
    ],
  },
]);

export default route;
