import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouteConfig } from "./types/router";
import Home from "./home";

const routes: Array<RouteConfig> = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/chart",
        element: <div>Chart</div>,
      },
      {
        path: "/w-hook",
        element: <div>WHook</div>,
      },
      {
        path: "/event",
        element: <div>event</div>,
      },
      {
        path: "/news",
        element: <div>news</div>,
      },
      {
        path: "/store",
        element: <div>store</div>,
      },
      {
        path: "/top-up-center",
        element: <div>top-up-center</div>,
      },
    ],
  },
];

const mainRouter = createBrowserRouter(routes);

export default function MainRouter() {
  return <RouterProvider router={mainRouter} />;
}
