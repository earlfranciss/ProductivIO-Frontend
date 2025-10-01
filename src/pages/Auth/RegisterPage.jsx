import React, { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import { useAuth } from "../../context/authContext";
import { Layers } from "lucide-react";
import { validateRegister } from "../../validation/RegisterValidation";

const RegisterPage = () => {
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });

    if (loading) return;
    setLoading(true);

    setErrors({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });

    const validationErrors = validateRegister({ firstName, lastName, email, password, confirmPassword });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      console.log("Errors", validationErrors);
      return;
    }

    try {
      const result = await register({ firstName, lastName, email, password });
      console.log(result.errors)
      if (result.success) {
        console.log("User created:", result.user);
        window.location.href = "/login";
      } else {
        const messages = result.errors?.general?.join("\n") || "Registration failed";

        setErrors({ firstName: messages, lastName: messages, email: messages, password: messages });
        setLoading(false);
      }
    } catch (err) {
      console.error("Registration failed:", err);
      setErrors({ firstName: "Invalid first name", lastName: "Invalid last name", email: "Invalid email", password: "Invalid password" });
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold mb-2">Sign Up</h2>
      <p className="text-gray-400 mb-6">Create an account to get started!</p>

      <form onSubmit={handleSubmit}>
        {/* First + Last Name */}
        <div className="flex gap-4 mb-2">
          <div className="flex-1">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div className="flex-1">
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="mb-2">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-2">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Terms */}
        <label className="flex items-center text-sm mb-6">
          <input type="checkbox" className="mr-2" /> I agree to Terms and Privacy
          Policy
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white 
            ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

      </form>


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
