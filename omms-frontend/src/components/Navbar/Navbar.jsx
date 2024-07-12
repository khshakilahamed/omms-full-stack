// import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import MenuItems from "../MenuItems/MenuItems";

const Navbar = () => {
  //   const location = useLocation();
  //   console.log(location);
  //   console.log(location.pathname);

  return (
    <nav className="bg-gray-200 fixed top-0 left-0 right-0">
      <div className="max-w-screen-xl mx-auto px-2 xl:px-0">
        <div className="h-[70px] w-full flex justify-between items-center">
          <div>
            <NavLink to={"/"} className="text-2xl font-bold">
              OMMS
            </NavLink>
          </div>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarFallback>KH</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className=" md:hidden bg-gray-200 p-3 z-90">
                  <MenuItems />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>Login</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
