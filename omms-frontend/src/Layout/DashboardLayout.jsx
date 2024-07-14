import Navbar from "@/components/Navbar/Navbar";
import SideMenu from "@/components/SideMenu/SideMenu";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto flex mt-[70px]">
        <div className="w-full flex relative">
          <aside className="py-3 hidden md:block w-[250px]  max-h-svh overflow-y-scroll fixed top-[70px] bottom-0">
            <nav className="px-3 pt-10">
              <Link to="/dashboard" >
                <h2 className="text-2xl font-bold p-4 text-primary">Dashboard</h2>
              </Link>
              <SideMenu />
            </nav>
          </aside>
          <main className="p-3 md:ml-[250px] flex-1 min-h-screen">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
