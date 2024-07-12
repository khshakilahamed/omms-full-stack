
import DashboardLayout from "@/Layout/DashboardLayout";
import DashboardHomePage from "@/pages/DashboardHome/DashboardHomePage";
import HomePage from "@/pages/Home/HomePage";
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
        element: <DashboardHomePage />,
      },
    ],
  },
]);

export default router;
