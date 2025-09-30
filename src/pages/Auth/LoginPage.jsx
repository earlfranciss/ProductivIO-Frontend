import React, { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import { useAuth } from "../../context/authContext";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });

    let hasError = false;

    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      hasError = true;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      hasError = true;
    }

    if (hasError) return;

    try {
      const result = await login({ email, password });
      console.log(result.errors)
      if (result.success) {
        console.log("Logged in:", result.user);
        window.location.href = "/dashboard";
      } else {
const messages = result.errors?.general?.join("\n") || "Login failed";

setErrors({ email: messages, password: messages });

      }
    } catch (err) {
      console.error("Login failed:", err);
      setErrors({ email: "Invalid email or password", password: "Invalid email or password" });
    }
  };

  // Combine all current errors into a single line
const combinedError = errors.email || errors.password;


  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold mb-2">Sign In</h2>
      <p className="text-gray-400 mb-6">
        Enter your email and password to sign in!
      </p>

      <form onSubmit={handleSubmit}>
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
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Sign In
        </button>
        {/* Error */}
        {combinedError && (
          <p className="text-red-500 text-sm mb-4 text-center whitespace-pre-line">{combinedError}</p>
        )}


      </form>

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
