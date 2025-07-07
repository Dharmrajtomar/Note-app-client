import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TEInput } from "tw-elements-react";
import Loader from "../components/Loader";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    otp: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGetOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post("https://note-app-server2-krxk.onrender.com/api/auth/send-otp", {
        name: formData.name,
        dob: formData.dob,
        email: formData.email,
      });
      setShowOtp(true);
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post("https://note-app-server2-krxk.onrender.com/api/auth/verify-otp", formData);
      alert("Account created successfully!");
      // Optionally reset form or redirect
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <form
        onSubmit={showOtp ? handleVerifyOtp : handleGetOtp}
        className="w-full max-w-md border border-gray-300 rounded-lg p-6 bg-white shadow-md flex flex-col items-center justify-center h-[600px]"
      >
        <div className="text-2xl font-bold mb-1 flex items-center gap-2">
          <Loader /> HD
        </div>
        <h1 className="text-2xl font-semibold">Sign up</h1>
        <p className="text-gray-500 text-sm mb-4">
          Sign up to enjoy the feature of HD
        </p>

        <div className="w-full max-w-xs space-y-3">
          <TEInput
            label="Your Name"
            type="text"
            name="name"
            // placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <TEInput
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          <TEInput
            label="Email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {showOtp && (
            <TEInput
              label="otp"
              type="text"
              name="otp"
              // placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white rounded w-full py-2"
          >
            {loading ? "Processing..." : showOtp ? "Sign Up" : "Get OTP"}
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
