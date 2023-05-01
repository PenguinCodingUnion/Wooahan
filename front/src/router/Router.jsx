import { createBrowserRouter } from "react-router-dom";
import App from "App";
import Main from "pages/Main";
import GameJump from "pages/GameJump";
import GameSleigh from "pages/GameSleigh";
import GameBubble from "pages/GameBubble";
import GameTrain from "pages/GameTrain";
import Books from 'pages/Books';
import { Suspense } from "react";

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
        element: (
          <Suspense fallback={<div> 로딩중이지롱 </div>}>
            <GameJump />
          </Suspense>
        ),
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
    ],
  },
]);

export default route;
