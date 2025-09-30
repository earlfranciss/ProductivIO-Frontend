import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
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
  Timer
} from 'lucide-react';
import { useAuth } from "../context/authContext";
import LogoutModal from "./LogoutModal";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const mainNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CircleCheckBig, label: 'Tasks', path: '/tasks' },
    { icon: FileEdit, label: 'Notes', path: '/notes' },
    { icon: SquareChartGantt, label: 'Flashcards', path: '/flashcards' },
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

  return (
    <div className="h-screen w-64 bg-zinc-900 text-gray-300 flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white"></div>
          <span className="text-white font-semibold">ProductivIO</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200">
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
      <div className="border-t border-zinc-800 p-3 relative">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-gray-500 flex items-center justify-center text-white text-sm font-semibold">
            EF
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-medium text-white">Earl Francis</div>
            <div className="text-xs text-gray-500">eyong@n-pax.com</div>
          </div>
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </button>

        {/* Profile Dropdown */}
        {isProfileOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-2 bg-zinc-800 rounded-lg border border-zinc-700 shadow-xl overflow-hidden">
            <div className="p-3 border-b border-zinc-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-gray-500 flex items-center justify-center text-white font-semibold">
                  EF
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Earl Francis</div>
                  <div className="text-xs text-gray-400">eyong@n-pax.com</div>
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
