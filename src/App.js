import logo from "./logo.svg";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import OtpVerify from "./pages/OtpVerify";
import GoogleSuccess from "./pages/GoogleSuccess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verify-otp" element={<OtpVerify />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
