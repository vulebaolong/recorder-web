import { RouteObject } from "react-router-dom";
import Home from "../pages/home/Home";

export const RecorderRoute: RouteObject[] = [
  {
    path: "",
    element: <Home />,
  },
];
