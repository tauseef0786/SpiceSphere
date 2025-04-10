import { AuthForm } from "../components/AuthForm";
import { apiClient } from "../apiClient";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      await apiClient.post("/auth/register", data);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Registration failed!");
    }
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
};

export default Register;
