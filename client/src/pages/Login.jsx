import { AuthForm } from "../components/AuthForm";
import { apiClient } from "../apiClient";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const res = await apiClient.post("/login", data);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/dashboard"); // or wherever you want to go
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed!");
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
};

export default Login;
