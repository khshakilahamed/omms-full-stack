import DashboardLayout from "@/Layout/DashboardLayout";
import DashboardHomePage from "@/pages/DashboardHome/DashboardHomePage";
import HomePage from "@/pages/Home/HomePage";
import LoginPage from "@/pages/Login/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CreateUserPage from "@/pages/CreateUser/CreateUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    //   errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    //   errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    //   errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardHomePage />,
      },
      {
        path: "/dashboard/create-user",
        element: <CreateUserPage />,
      },
    ],
  },
]);

export default router;
