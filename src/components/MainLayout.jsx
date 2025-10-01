import React, { useState } from "react";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative h-screen bg-gray-900 text-white flex overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-shrink-0 bg-gray-800 h-full">
        <Sidebar />
      </div>

      {/* Mobile Sidebar (slide-over) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          ></div>

          {/* Sidebar panel */}
          <div className="relative w-64 bg-gray-800 h-full">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white font-bold"
              >
                ✕
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative h-full overflow-hidden">
        {/* Mobile top bar */}
        <div className="flex md:hidden justify-between items-center mb-4">
          <h1 className="text-xl font-bold">ProductivIO</h1>
          <button
            onClick={() => setMobileOpen(true)}
            className="text-white font-bold"
          >
            ☰
          </button>
        </div>

        {/* Decorative blobs */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Main content (fills the remaining space) */}
        <div className="relative z-10 w-full flex-1 overflow-y-auto">
          <div className="p-6 pt-2 md:p-8 md:pt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
