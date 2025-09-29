import React from "react";
import LogoToggle from "./LogoToggle";

const AuthLayout = ({ children }) => {
  return (
    <div className="relative flex min-h-screen">
      {/* Background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
      </svg>

      {/* Left Section */}
      <div className="hidden md:flex w-1/2 bg-gray-800 items-center justify-center relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"></div>

        {/* Center content */}
        <div className="relative text-center z-10">
          <LogoToggle />
          <h1 className="text-5xl font-bold mb-4 text-white">ProductivIO</h1>
          <p className="text-gray-200">Boost productivity, one click at a time.</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-900 text-white p-8">
        {/* Accent blobs */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl"></div>

        {/* Form container */}
        <div className="w-full max-w-md relative z-10">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
