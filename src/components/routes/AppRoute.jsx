import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { adminRoute, routes } from "./Routes";
import Hero from "../pages/web/Hero";
import WebsiteLayout from "../layouts/WebsiteLayout";
import Login from "../pages/web/Login";
import AdminLayout from "../layouts/AdminLayout";
import Collection from "../pages/web/Collection";
import PrivateRoute from "./PrivateRoute";
import GalleryCards from "../pages/web/GalleryCrads";

function AppRoute() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WebsiteLayout />,
      children: [
        {
          index: true, element: <>
            <Hero />
            <Collection />
            <GalleryCards />
          </>
        },
        ...routes,
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/admin",
      element: (
        <PrivateRoute>
          <AdminLayout />
        </PrivateRoute>
      ),
      children: [...adminRoute],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoute;
