// import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const Navbar = () => {
//   const location = useLocation();
//   console.log(location);
//   console.log(location.pathname);

  return (
    <nav className="bg-gray-200 fixed top-0 left-0 right-0">
      <div className="max-w-screen-xl mx-auto px-2 xl:px-0">
        <div className="h-[70px] w-full flex justify-between items-center">
          <NavLink to={"/"} className="text-2xl font-bold">OMMS</NavLink>
          <Button>Login</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
