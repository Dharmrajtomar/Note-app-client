import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import { TEInput } from "tw-elements-react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResend = async () => {
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/send-otp", { email });
      setShowOtpInput(true);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { email, otp }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md border border-gray-300 rounded-lg p-6 bg-white shadow-md flex flex-col items-center justify-center h-[600px]">
        <div className="text-2xl font-bold mb-1 flex">
          <Loader /> HD
        </div>
        <h1 className="text-2xl font-semibold">Sign In</h1>
        <p className="text-gray-500 text-sm mb-4">
          Please login to continue to your account.
        </p>

        <div className="w-full max-w-xs space-y-3">
          <TEInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // placeholder="Email"
            className="border rounded w-full px-3 py-2"
          />

          {showOtpInput && (
            <TEInput
              label="OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              // placeholder="OTP"
              className="border rounded w-full px-3 py-2"
            />
          )}

          <div className="text-sm text-blue-500">
            <button
              className="bg-blue-500 text-white rounded w-full py-2"
              onClick={handleResend}
            >
              {showOtpInput ? "Resend OTP" : "Send OTP"}
            </button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex items-center text-sm">
            <input type="checkbox" id="keepLoggedIn" className="mr-2" />
            <label htmlFor="keepLoggedIn">Keep me logged in</label>
          </div>

          {showOtpInput && (
            <button
              className="bg-blue-500 text-white rounded w-full py-2"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Sign In"}
            </button>
          )}

          <p className="text-center text-sm text-gray-600">
            Need an account?{" "}
            <Link to="/" className="text-blue-500">
              Create one
            </Link>
          </p>

          <a
            href="http://localhost:5000/api/auth/google"
            className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded mt-4 text-center block"
          >
            Continue with Google
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
