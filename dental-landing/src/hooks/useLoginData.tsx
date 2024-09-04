import { useEffect, useState } from "react";
import { useAuth } from "../Features/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { userServices } from "../services";
import { LoginFormInputs } from "../types/props/login.props";
import Swal from "sweetalert2";

export const useLoginData = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false)


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onLoginSubmit = async (data: LoginFormInputs) => {
    setloading(true)
    try {
      const response = await userServices.login({
        email: data.email,
        password: data.password,
      });

      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      if (response.data.RoleObject) {
        localStorage.setItem(
          "RoleObject",
          JSON.stringify(response.data.RoleObject)
        );
      }
      login(response.data.token);

      navigate("/dashboard");
    } catch (error) {
      let title = "Error de autenticación";
      let message = "verifica tus credenciales";

      if (error instanceof AxiosError) {
        if (error?.response?.status === 412) {
          title = "Cuenta bloqueada";
          message = `solicita el cambio de contraseña en "Olvide mi Contraseña"`;
        }
      }

      console.error("Error logging in:", error);
      Swal.fire({
        icon: "error",
        title: title,
        text: message,
      });
    } finally {
      setloading(false)
    }
  };
  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated]);

  return {
    togglePasswordVisibility,
    onLoginSubmit,
    showPassword,
    loading
  };
};
