import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import Dashboard from "../pages/Dashboard";
import Papers from "../pages/Papers";
import CreatePaper from "../pages/CreatePaper";
import PaperWorkspace from "../pages/PaperWorkspace";
import Assistant from "../pages/Assistant";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "papers",
        element: <Papers />,
      },
      {
      path: "papers/new",
      element: <CreatePaper />,
      },
      {
      path: "papers/:paperId",
      element: <PaperWorkspace />,
      },
      {
      path: "assistant",
      element: <Assistant />,
    },
    {
    path: "/login",
    element: <Login />,
  },
    
    ],
  },
]);

export default router;