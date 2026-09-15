import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import AppLayout from "../layouts/AppLayout";

import Dashboard from "../pages/Dashboard";
import Papers from "../pages/Papers";
import CreatePaper from "../pages/CreatePaper";
import PaperWorkspace from "../pages/PaperWorkspace";
import Assistant from "../pages/Assistant";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    element: <AppLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/papers",
        element: <Papers />,
      },
      {
        path: "/papers/new",
        element: <CreatePaper />,
      },
      {
        path: "/papers/:paperId",
        element: <PaperWorkspace />,
      },
      {
        path: "/assistant",
        element: <Assistant />,
      },
    ],
  },
]);

export default router;