import DashboardLayout from "@/Layout/DashboardLayout";
import DashboardHomePage from "@/pages/DashboardHome/DashboardHomePage";
import HomePage from "@/pages/Home/HomePage";
import LoginPage from "@/pages/Login/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CreateMealCategoryPage from "@/pages/MealCategory/CreateMealCategoryPage";
import EditUserPage from "@/pages/User/EditUserPage";
import CreateUserPage from "@/pages/User/CreateUserPage";
import UserListPage from "@/pages/User/UserListPage";
import MealCategoryListPage from "@/pages/MealCategory/MealCategoryListPage";
import EditMealCategoryPage from "@/pages/MealCategory/EditMealCategoryPage";
import CreateMealItemPage from "@/pages/MealItem/CreateMealItemPage";
import MealItemListPage from "@/pages/MealItem/MealItemListPage";
import EditMealItemPage from "@/pages/MealItem/EditMealItemPage";
import CreateMealPage from "@/pages/Meal/CreateMeal";
import MealListPage from "@/pages/Meal/MealListPage";
import DailyMealPage from "@/pages/Meal/DailyMealPage";
import MyOrderListPage from "@/pages/Order/MyOrderList";
import AllOrderListPage from "@/pages/Order/AllOrderList";

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
        path: "/dashboard/my-orders",
        element: <MyOrderListPage />,
      },
      {
        path: "/dashboard/all-orders",
        element: <AllOrderListPage />,
      },
      {
        path: "/dashboard/daily-meal",
        element: <DailyMealPage />,
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
        path: "/dashboard/edit-meal-category/:id",
        element: <EditMealCategoryPage />,
      },
      {
        path: "/dashboard/create-meal-item",
        element: <CreateMealItemPage />,
      },
      {
        path: "/dashboard/meal-item-list",
        element: <MealItemListPage />,
      },
      {
        path: "/dashboard/edit-meal-item/:id",
        element: <EditMealItemPage />,
      },
      {
        path: "/dashboard/create-meal",
        element: <CreateMealPage />,
      },
      {
        path: "/dashboard/meal-list",
        element: <MealListPage />,
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
