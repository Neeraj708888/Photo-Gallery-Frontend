import React, { useState } from "react";
import {
  Image,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShoppingBag,
  User,
  Users,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmModal from "../pages/modals/ConfirmModal";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../features/adminSlices/adminSlice";
import FullPageLoader from "../utils/FullPageLoader";

export default function Sidebar({ isOpen, toggleSidebar }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmModal, setConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Logout Handler
  const handleLogout = async () => {
    setLoading(true);
    const result = await dispatch(logoutAdmin());
    setLoading(false);
    setConfirmModal(false);
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/login"); // redirect to login
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 h-screen bg-gradient-to-b from-pink-500/90 via-rose-400/80 to-pink-300/70 text-white flex flex-col transition-all duration-300 backdrop-blur-xl shadow-lg border-r border-white/20 z-40 ${isOpen ? "w-64" : "w-16"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/30">
          <h2
            className={`text-lg font-extrabold tracking-wide drop-shadow-sm ${!isOpen && "hidden"
              }`}
          >
            💍 Gallery Admin
          </h2>
          <button
            onClick={toggleSidebar}
            className="text-white/80 hover:text-white transition-all focus:outline-none"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Menu Links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-2 mt-2">
          {[
            {
              label: "Dashboard",
              icon: <LayoutDashboard size={20} />,
              href: "/admin/dashboard",
            },
            {
              label: "Banner",
              icon: <ShoppingBag size={20} />,
              href: "/admin/banner",
            },
            {
              label: "Collection",
              icon: <ImageIcon size={20} />,
              href: "/admin/collection",
            },
            {
              label: "Gallery",
              icon: <Users size={20} />,
              href: "/admin/gallery",
            },
          ].map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${isActive
                  ? "bg-white/25 text-white font-semibold shadow-sm"
                  : "hover:bg-white/15 text-white/80 hover:text-white"
                  }`}
              >
                {item.icon}
                {isOpen && <span>{item.label}</span>}
              </a>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-white/30 text-sm h-14">
          {isOpen ? (
            <div className="flex items-center gap-10 text-white/90 justify-center">
              <button
                className="hover:scale-110 transition-transform"
                onClick={() => navigate("/admin/profile")}
              >
                <User size={18} />
              </button>

              <button className="hover:scale-110 transition-transform">
                <Settings size={18} />
              </button>

              <button
                className="hover:scale-110 transition-transform"
                onClick={() => setConfirmModal(true)}
              >
                <LogOut size={18} className="text-red-100 hover:text-white" />
              </button>
            </div>
          ) : (
            <button
              className="flex items-center justify-center w-full hover:text-white transition cursor-pointer"
              onClick={() => setConfirmModal(true)}
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </aside>

      {/* 🔹 Logout Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal}
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
        onConfirm={handleLogout}
        onCancel={() => setConfirmModal(false)}
      >
        <LogOut size={40} className="text-rose-500" />
      </ConfirmModal>

      {/* Full Page Loader */}
      {loading && <FullPageLoader />}
    </>
  );
}
