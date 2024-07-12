import { NavLink } from "react-router-dom";

const MenuItems = () => {
  return (
    <ul className="flex flex-col gap-2">
      <NavLink
        to="#"
        className="px-1 md:px-3 md:py-1 hover:bg-gray-300 transition-all duration-200 cursor-pointer text-sm md:text-base"
      >
        Today&apos;s Meal Item
      </NavLink>
      <NavLink
        to="#"
        className="px-1 md:px-3 md:py-1 hover:bg-gray-300 transition-all duration-200 cursor-pointer text-sm md:text-base"
      >
        My Order
      </NavLink>
      <NavLink
        to="#"
        className="px-1 md:px-3 md:py-1 hover:bg-gray-300 transition-all duration-200 cursor-pointer text-sm md:text-base"
      >
        Create Meal Category
      </NavLink>
      <NavLink
        to="#"
        className="px-1 md:px-3 md:py-1 hover:bg-gray-300 transition-all duration-200 cursor-pointe text-sm md:text-baser"
      >
        Create Meal Item
      </NavLink>
      <NavLink
        to="#"
        className="px-1 md:px-3 md:py-1 hover:bg-gray-300 transition-all duration-200 cursor-pointer text-sm md:text-base"
      >
        Create Meal For Today
      </NavLink>
      <NavLink
        to="#"
        className="px-1 md:px-3 md:py-1 hover:bg-gray-300 transition-all duration-200 cursor-pointer text-sm md:text-base"
      >
        Create User
      </NavLink>
      <NavLink
        to="#"
        className="px-1 md:px-3 md:py-1 hover:bg-gray-300 transition-all duration-200 cursor-pointer text-sm md:text-base"
      >
        User List
      </NavLink>
      <NavLink
        to="#"
        className="px-1 md:px-3 md:py-1 hover:bg-gray-300 transition-all duration-200 cursor-pointer text-sm md:text-base"
      >
        Order List
      </NavLink>
    </ul>
  );
};

export default MenuItems;
