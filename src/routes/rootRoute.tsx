import MainLayout from "../layouts/MainLayout";
import { RouteObject, useRoutes } from "react-router-dom";
import { RecorderRoute } from "./recorderRoute";

export const RootRoute = () => {
  const routes: RouteObject[] = [
    {
      path: "*",
      element: <MainLayout />,
      children: RecorderRoute,
    },
  ];
  return useRoutes(routes);
};
