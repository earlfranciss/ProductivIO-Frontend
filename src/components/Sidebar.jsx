import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import LogoutModal from "./LogoutModal";
import {
  LayoutDashboard,
  FileEdit,
  MoreHorizontal,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  User,
  CircleCheckBig,
  SquareChartGantt,
  Brain,
  Timer,
  Layers
} from 'lucide-react';

export default function Sidebar() {
  const { user, loading: authLoading } = useAuth();
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const profileRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const mainNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CircleCheckBig, label: 'Tasks', path: '/tasks' },
    { icon: FileEdit, label: 'Notes', path: '/notes' },
    { icon: Layers, label: 'Flashcards', path: '/flashcards' },
    { icon: Brain, label: 'Quiz', path: '/quiz' },
    { icon: Timer, label: 'Pomodoro', path: '/pomodoro' }
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Get Help', path: '/help' },
  ];

  const handleConfirmLogout = () => {
    logout();
    navigate("/login");
  };

  // User Profile closes if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-screen w-64 bg-zinc-900 text-gray-300 flex flex-col border-r border-zinc-800">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <motion.img
            src={hover ? "/icon-glow.png" : "/icon.png"}
            alt="ProductivIO Logo"
            className="h-8 w-auto cursor-pointer"
            whileHover={{ scale: 1.25, rotate: 20 }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />
          <span className="text-white font-semibold">ProductivIO</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 pt-3 px-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-zinc-800 text-white'
                    : 'text-gray-400 hover:bg-zinc-800 hover:text-gray-300'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-zinc-800 px-3 py-3 space-y-1">
        {bottomItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveItem(item.label)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              activeItem === item.label
                ? 'bg-zinc-800 text-white'
                : 'text-gray-400 hover:bg-zinc-800 hover:text-gray-300'
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* User Profile */}
      <div ref={profileRef} className="border-t border-zinc-800 p-3 relative ">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <div className="w-8 h-8 px-2 rounded-full bg-gradient-to-br from-blue-500 to-gray-500 flex items-center justify-center text-white text-sm font-semibold">
            {`${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0  text-left">
            <div className="truncate text-sm font-medium text-white">{user.firstName}</div>
            <div className="truncate text-xs text-gray-500">{user.email}</div>
          </div>
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </button>

        {/* Profile Dropdown */}
        {isProfileOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-2 bg-zinc-800 rounded-lg border border-zinc-700 shadow-xl overflow-hidden">
            <div className="p-3 border-b border-zinc-700 ">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 px-2 rounded-full bg-gradient-to-br from-blue-500 to-gray-500 flex items-center justify-center text-white text-sm font-semibold">
                  {`${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0  text-left">
                  <div className="truncate text-sm font-medium text-white">{user.firstName}</div>
                  <div className="truncate text-xs text-gray-400">{user.email}</div>
                </div>
              </div>
            </div>
            <div className="py-1">
              <button
                onClick={() => navigate("/account")}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-zinc-750 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Account</span>
              </button>
              <button
                onClick={() => navigate("/notification")}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-zinc-750 transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </button>
              <button
                onClick={() => setIsLogoutOpen(true)}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-zinc-750 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logout Modal */}
      {isLogoutOpen && (
        <LogoutModal
          onLogout={handleConfirmLogout}
          onCancel={() => setIsLogoutOpen(false)}
        />
      )}
    </div>
  );
}
