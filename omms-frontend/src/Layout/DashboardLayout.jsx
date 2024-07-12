import Navbar from "@/components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto flex mt-[70px]">
        <div className="w-full flex relative">
          <aside className="py-3 w-[200px] bg-gray-200 max-h-svh overflow-y-scroll fixed top-[70px] bottom-0">
            <nav className="px-3">
              <ul className="flex flex-col gap-2">
                <li className="border border-gray-300 rounded px-3 py-1 font-bold hover:bg-gray-300 transition-all duration-200 cursor-pointer">
                  <a href="#">Meal</a>
                </li>
                <li className="border border-gray-300 rounded px-3 py-1 font-bold hover:bg-gray-300 transition-all duration-200 cursor-pointer">
                  <a href="#">My Order</a>
                </li>
              </ul>
            </nav>
          </aside>
          <main className="p-3 flex-1 min-h-screen">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
