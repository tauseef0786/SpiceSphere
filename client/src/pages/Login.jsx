import { AuthForm } from "../components/AuthForm";
import { apiClient } from "../apiClient";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const res = await apiClient.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/"); 
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed!");
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
};

export default Login;
