import React, { useState } from "react";
import AuthLayout from "../../components/AuthLayout";

const RegisterPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold mb-2">Sign Up</h2>
      <p className="text-gray-400 mb-6">Create an account to get started!</p>

      {/* Name */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          value={form.firstName}
          onChange={handleChange}
          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          value={form.lastName}
          onChange={handleChange}
          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
        />
      </div>

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full mb-4 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
      />

      {/* Password */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full mb-4 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
      />

      {/* Terms */}
      <label className="flex items-center text-sm mb-6">
        <input type="checkbox" className="mr-2" /> I agree to Terms and Privacy
        Policy
      </label>

      {/* Submit */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
        Sign Up
      </button>

      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500">
          Sign In
        </a>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
