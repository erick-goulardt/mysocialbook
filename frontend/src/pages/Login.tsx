import { useState } from "react";
import { login } from "../api/auth.service";
import Photo from "../assets/homephoto.svg";
import { Form } from "react-bootstrap";
import "../css/login.style.css";
import Title from "../assets/homelogo.svg";
import Icon from "../assets/homeicon.svg";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      console.log("Login successful", response);
    } catch (error) {
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
          <p className="label-form">Email</p>
          <Form.Control
            className="input-form"
            type="text"
            id="nome"
            placeholder="Digite seu e-mail"
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
};

export default LoginComponent;
