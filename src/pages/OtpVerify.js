import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("temp_email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { email, otp }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.removeItem("temp_email");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Verify OTP
        </h2>

        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 px-1 text-sm mb-4"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default OtpVerify;
