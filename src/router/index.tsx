import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import Dashboard from "../pages/Dashboard";
import Papers from "../pages/Papers";
import CreatePaper from "../pages/CreatePaper";
import PaperWorkspace from "../pages/PaperWorkspace";

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
    ],
  },
]);

export default router;