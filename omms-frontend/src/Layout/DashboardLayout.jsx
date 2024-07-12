import MenuItems from "@/components/MenuItems/MenuItems";
import Navbar from "@/components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto flex mt-[70px]">
        <div className="w-full flex relative">
          <aside className="py-3 hidden md:block w-[250px]  max-h-svh overflow-y-scroll fixed top-[70px] bottom-0">
            <nav className="px-3 pt-10">
              <MenuItems />
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
