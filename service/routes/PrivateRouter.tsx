import { useRoutes } from "react-router-dom";
import Layout from "src/layout/Layout";
import generalRoutes from "./generalRoutes";

//pages
import Home from "pages/home/Home";
import NotFound from "pages/NotFound";
import Profile from "pages/profile/Profile";
import AllFriends from "pages/friends/AllFriends";
import EditProfile from "pages/profile/EditProfile";


export default function PrivateRouter() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        ...generalRoutes,
        { element: <Home />, index: true },
        { element: <Profile />, path: "profile"},
        { element: <Profile />, path: "profile/:id"},
        { element: <EditProfile />, path: "profile/edit/:id"},
        { element: <AllFriends />, path: "all-friends"},
        { element: <AllFriends />, path: "all-friends/:selected"},
        { path: "*", element: <NotFound /> },
      ],
    }
  ]);

  return routes;
}
