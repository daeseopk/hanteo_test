import { createBrowserRouter, RouterProvider } from "react-router-dom";
const mainRouter = createBrowserRouter([
  {
    path: "/chart",
    element: <div>Chart</div>,
  },
  {
    path: "/WHook",
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
]);
export default function MainRouter() {
  return <RouterProvider router={mainRouter} />;
}
