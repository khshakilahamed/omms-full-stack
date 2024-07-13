// import { useLocation } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import MenuItems from "../MenuItems/MenuItems";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

const Navbar = () => {
  const user = useSelector(state => state.auth?.user);
  const dispatch = useDispatch();
  const userNamesArray = user?.name ? user.name.split(" ") : [];
  let userNameCharacters = "";

  if (userNamesArray.length >= 2) {
    userNameCharacters = `${userNamesArray[0][0]}${userNamesArray[userNamesArray.length - 1][0]}`;
  } else if (userNamesArray.length === 1 && userNamesArray[0].length >= 2) {
    userNameCharacters = `${userNamesArray[0][0]}${userNamesArray[0][1]}`;
  }


  //   const location = useLocation();
  //   console.log(location);
  //   console.log(location.pathname);

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <nav className="bg-primary/55 fixed top-0 left-0 right-0 z-40">
      <div className="max-w-screen-xl mx-auto px-2 xl:px-0">
        <div className="h-[70px] w-full flex justify-between items-center">
          <div>
            <NavLink to={"/"} className="text-2xl font-bold">
              OMMS
            </NavLink>
          </div>
          <div className="flex items-center">
            {
              user?.email && <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarFallback>{userNameCharacters}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2 bg-primary/75 p-2 min-w-40">
                  <div className="md:hidden p-3 z-90">
                    <MenuItems />
                  </div>
                  <div className="text-center">
                    <Button className="bg-secondary" onClick={handleLogout}>Logout</Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            }
            {
              !user?.email && <Link to={"/login"}><Button>Login</Button></Link>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
