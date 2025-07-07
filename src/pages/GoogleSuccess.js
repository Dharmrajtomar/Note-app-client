import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GoogleSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      navigate("/signin");
    }
  }, [params, navigate]);

  return <p>Signing in with Google...</p>;
};

export default GoogleSuccess;
