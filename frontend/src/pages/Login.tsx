import { useState } from "react";
import { login } from "../api/auth.service";
import Photo from "../assets/homephoto.svg";
import { Form } from "react-bootstrap";
import "../css/login.style.css";
import Title from "../assets/homelogo.svg";
import Icon from "../assets/homeicon.svg";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: authLogin } = useAuth();
   const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      if (response) {
        authLogin(response.data);
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/profile')
        console.log("Login successful", response);
      }
    } catch (error) {
      setTimeout(() => {
        setError(true);
      }, 2250);
      console.error("Login failed", error);
    }

    

  };
  
  return (
    <div className="container-home">
      <div className="container-form">
        <div className="container-header-title">
          <img src={Icon} alt="" />
          <img src={Title} alt="" />
        </div>
        <h3 className="login-text">Faça seu Login</h3>
        <div className="container-input">
          <p className="label-form">Username</p>
          <Form.Control
            className="input-form"
            type="text"
            id="username"
            placeholder="Digite seu username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="container-input">
          <p className="label-form">Senha</p>
          <Form.Control
            className="input-form"
            type="password"
            id="senha"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message">Usuário ou senha errados!</p> }
        </div>
        <div className="forget-password-container">
          <div className="check-style">
            <input type="checkbox"/>
            Lembrar senha
          </div>
          <div className="redirect-password">
            <a href="#">Esqueci minha senha</a>
          </div>
        </div>
        <button 
        className="insert-button"
        onClick={handleLogin}>Login
        </button>
      </div>
      <div className="container-image">
        <img src={Photo} alt="" />
      </div>
    </div>
  );
}

