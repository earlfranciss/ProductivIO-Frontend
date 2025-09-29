import React, { useState } from "react";
import AuthLayout from "../../components/AuthLayout";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold mb-2">Sign In</h2>
      <p className="text-gray-400 mb-6">
        Enter your email and password to sign in!
      </p>


      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none"
          placeholder="Enter your email"
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-sm mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none"
          placeholder="Enter your password"
        />
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center text-sm">
          <input type="checkbox" className="mr-2" /> Keep me logged in
        </label>
        <a href="/forgot-password" className="text-blue-500 text-sm">
          Forgot password?
        </a>
      </div>

      {/* Submit */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
        Sign In
      </button>

      {/* Register link */}
      <p className="mt-6 text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-500">
          Sign Up
        </a>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
