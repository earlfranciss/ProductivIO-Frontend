import React, { useState } from "react";
import AuthLayout from "../../components/AuthLayout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold mb-2">Forgot Your Password?</h2>
      <p className="text-gray-400 mb-6">
        Enter your email address linked to your account, and we'll send you a
        reset link.
      </p>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
      />

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
        Send Reset Link
      </button>

      <p className="mt-6 text-center text-sm text-gray-400">
        Wait, I remember my password...{" "}
        <a href="/login" className="text-blue-500">
          Click here
        </a>
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;
