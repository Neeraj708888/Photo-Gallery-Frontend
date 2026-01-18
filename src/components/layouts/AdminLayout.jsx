import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminNavbar from "../Admin/AdminHeader";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex min-h-screen bg-gray-100 ml-16">
      {/* Sidebar */}
      <AdminSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 transition-all duration-300 overflow-x-auto">
        {/* Navbar */}
        <AdminNavbar isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto mt-[70px] mb-[60px]  bg-white/70 backdrop-blur-sm rounded-tl-2xl shadow-inner">
          <Outlet />
        </main>

        {/* Transparent Footer */}
        <footer
          className="fixed bottom-0 right-0 z-40 flex items-center justify-center h-[60px]
                     text-gray-800 bg-transparent backdrop-blur-sm border-t border-white/20
                     shadow-[0_-2px_8px_rgba(0,0,0,0.1)] transition-all duration-300"
          style={{
            left: isOpen ? "16rem" : "4rem",
            width: isOpen ? "calc(100% - 16rem)" : "calc(100% - 4rem)",
          }}
        >
          <p className="text-sm font-semibold tracking-wide">
            © {new Date().getFullYear()}{" "}
            <span className="text-blue-600 font-bold">Photo Gallery</span> Admin
            Panel
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
