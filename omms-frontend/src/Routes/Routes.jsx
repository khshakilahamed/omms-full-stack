import DashboardLayout from "@/Layout/DashboardLayout";
import DashboardPage from "@/pages/Dashboard/Dashboard";
import HomePage from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    //   errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    //   errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);

export default router;
