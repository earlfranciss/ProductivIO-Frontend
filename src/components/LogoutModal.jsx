import React from "react";

export default function LogoutModal({ onLogout, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onCancel}
      ></div>

      {/* Modal */}
      <div className="relative bg-zinc-800 rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
        {/* Icon + Text */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-6 h-6 text-red-400"
            >
              <path
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 
                   3.374h14.71c1.73 0 2.813-1.874 
                   1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 
                   0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Logout</h3>
            <p className="mt-2 text-sm text-gray-400">
              Are you sure you want to log out of your account?
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-white/10 text-white text-sm font-medium hover:bg-white/20"
          >
            Cancel
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-400"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
