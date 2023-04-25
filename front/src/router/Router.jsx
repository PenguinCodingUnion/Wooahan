import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const route = createBrowserRouter([
  {
    path: `/`,
    element: <App />,
  },
]);

export default route;
