import React, { useState } from "react";
import AuthLayout from "../../components/AuthLayout";

const TwoFactorAuth = () => {
  const [code, setCode] = useState("");

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold mb-2">Two Step Verification</h2>
      <p className="text-gray-400 mb-6">
        A verification code has been sent to your mobile. Enter it below.
      </p>

      <div className="flex gap-2 justify-between mb-6">
        {[...Array(6)].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            className="w-12 h-12 text-center bg-gray-800 border border-gray-700 rounded-lg"
          />
        ))}
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
        Verify My Account
      </button>

      <p className="mt-6 text-center text-sm text-gray-400">
        Didn't get the code?{" "}
        <a href="#" className="text-blue-500">
          Resend
        </a>
      </p>
    </AuthLayout>
  );
};

export default TwoFactorAuth;
