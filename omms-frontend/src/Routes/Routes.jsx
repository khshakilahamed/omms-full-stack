import DashboardLayout from "@/Layout/DashboardLayout";
import DashboardHomePage from "@/pages/DashboardHome/DashboardHomePage";
import HomePage from "@/pages/Home/HomePage";
import LoginPage from "@/pages/Login/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CreateMealCategoryPage from "@/pages/MealCategory/CreateMealCategoryPage";
import MealCategoryListPage from "@/pages/MealCategory/MealCategoryList";
import EditUserPage from "@/pages/User/EditUserPage";
import CreateUserPage from "@/pages/User/CreateUserPage";
import UserListPage from "@/pages/User/UserListPage";
import EditMealCategoryPage from "@/pages/MealCategory/EditMealCategory";

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
        path: "/dashboard/create-meal-category",
        element: <CreateMealCategoryPage />,
      },
      {
        path: "/dashboard/meal-category-list",
        element: <MealCategoryListPage />,
      },
      {
        path: "/dashboard/meal-category-list/:id",
        element: <EditMealCategoryPage />,
      },
      {
        path: "/dashboard/create-user",
        element: <CreateUserPage />,
      },
      {
        path: "/dashboard/user-list",
        element: <UserListPage />,
      },
      {
        path: "/dashboard/edit-user/:id",
        element: <EditUserPage />,
      },
    ],
  },
]);

export default router;
