import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const SideMenu = () => {
  const { user } = useSelector(state => state?.auth)
  return (
    <ul className="flex flex-col gap-2">
      <NavLink
        to="/dashboard/daily-meal"
        className="px-1 md:px-3 md:py-1 hover:bg-primary/30 transition-all duration-200 cursor-pointer text-sm md:text-base"
      >
        Daily Meal
      </NavLink>
      <NavLink
        to="/dashboard/my-orders"
        className="px-1 md:px-3 md:py-1 hover:bg-primary/30 transition-all duration-200 cursor-pointer text-sm md:text-base"
      >
        My Order
      </NavLink>
      {
        user?.email && user?.role === 'admin' && <>
          <NavLink
            to="/dashboard/create-meal-category"
            className="px-1 md:px-3 md:py-1 hover:bg-primary/30 transition-all duration-200 cursor-pointer text-sm md:text-base"
          >
            Create Meal Category
          </NavLink>
          <NavLink
            to="/dashboard/meal-category-list"
            className="px-1 md:px-3 md:py-1 hover:bg-primary/30 transition-all duration-200 cursor-pointer text-sm md:text-base"
          >
            Meal Category List
          </NavLink>
          <NavLink
            to="/dashboard/create-meal-item"
            className="px-1 md:px-3 md:py-1 hover:bg-primary/30 transition-all duration-200 cursor-pointe text-sm md:text-base"
          >
            Create Meal Item
          </NavLink>
          <NavLink
            to="/dashboard/meal-item-list"
            className="px-1 md:px-3 md:py-1 hover:bg-primary/30 transition-all duration-200 cursor-pointe text-sm md:text-base"
          >
            Meal Item List
          </NavLink>
          <NavLink
            to="/dashboard/create-meal"
            className="px-1 md:px-3 md:py-1 hover:bg-primary/30 transition-all duration-200 cursor-pointer text-sm md:text-base"
          >
            Create Daily Meal
          </NavLink>
          <NavLink
            to="/dashboard/meal-list"
            className="px-1 md:px-3 md:py-1 hover:bg-primary/30 transition-all duration-200 cursor-pointer text-sm md:text-base"
          >
            Meal List
          </NavLink>
          <NavLink
            to="/dashboard/create-user"
            className="px-1 md:px-3 md:py-1 hover:bg-primary/30 transition-all duration-200 cursor-pointer text-sm md:text-base"
          >
            Create User
          </NavLink>
          <NavLink
            to="/dashboard/user-list"
            className="px-1 md:px-3 md:py-1 hover:bg-primary/30 transition-all duration-200 cursor-pointer text-sm md:text-base"
          >
            User List
          </NavLink>
          <NavLink
            to="/dashboard/all-orders"
            className="px-1 md:px-3 md:py-1 hover:bg-primary/30 transition-all duration-200 cursor-pointer text-sm md:text-base"
          >
            Order List
          </NavLink>

        </>
      }
      {/* <NavLink
        to="#"
        className="px-1 md:px-3 md:py-1 hover:bg-primary/30 transition-all duration-200 cursor-pointer text-sm md:text-base"
      >
        Change Password
      </NavLink> */}
    </ul>
  );
};

export default SideMenu;
