import { FormEvent, useState } from "react";
import Photo from "../assets/homephoto.svg";
import { Form } from "react-bootstrap";
import "../css/login.style.css";
import Title from "../assets/homelogo.svg";
import Icon from "../assets/homeicon.svg";
import Sign from "../assets/sign.svg";
import { register } from "../api/auth.service";
import { useNavigate } from "react-router-dom";


export function Register() {
  const navigate = useNavigate();
  const initialUserState = {
    nome: "",
    email: "",
    numero: 0,
    descricao: "",
    username: "",
    senha: "",
    imageUrl: "",
  };

  const [inputAvatar, setInputAvatar] = useState(false);
  const [user, setUser] = useState(initialUserState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const sendToAvatarConfirm = () => {
    setInputAvatar(true);
  };

  const switchPageStatus = () => {
    setInputAvatar(!inputAvatar);
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      try {
        const response = await register(user.username, user.senha, user.descricao, user.numero, user.imageUrl, user.nome, user.email);
        if (response) {
          navigate('/')
          console.log("Register successful", response);
        }
      } catch (error) {
        navigate('/register')
        console.error("Register failed", error);
      }
  }

  return (
    <>
      {inputAvatar ? (
        <form onSubmit={handleRegister} className="container-home">
          <div>
            <img
              src={Sign}
              alt=""
              className="sign"
              onClick={switchPageStatus}
            />
          </div>
          <div className="container-form">
            <div className="container-header-title">
              <img src={Icon} alt="" />
              <img src={Title} alt="" />
            </div>
            <h3 className="login-text">Registre-se aqui!</h3>
            <div className="container-input">
              <p className="label-form">Avatar Url</p>
              <Form.Control
                className="input-form"
                type="text"
                name="imageUrl"
                value={user.imageUrl}
                placeholder="Envie seu avatar"
                onChange={handleChange}
              />
            </div>
            <button className="insert-button" type="submit">
              {inputAvatar ? "Enviar" : "Próximo"}
            </button>
          </div>
          <div className="container-image">
            <img src={Photo} alt="" />
          </div>
        </form>
      ) : (
        <>
          <form className="container-home">
            <div className="container-form">
              <div className="container-header-title">
                <img src={Icon} alt="" />
                <img src={Title} alt="" />
              </div>
              <h3 className="login-text">Registre-se aqui!</h3>
              <div className="container-input">
                <p className="label-form">Nome</p>
                <Form.Control
                  className="input-form"
                  type="text"
                  name="nome"
                  value={user.nome}
                  placeholder="Digite seu nome"
                  onChange={handleChange}
                />
              </div>
              <div className="container-input">
                <p className="label-form">Senha</p>
                <Form.Control
                  className="input-form"
                  type="password"
                  name="senha"
                  value={user.senha}
                  placeholder="Digite sua senha"
                  onChange={handleChange}
                />
              </div>
              <div className="container-input">
                <p className="label-form">Email</p>
                <Form.Control
                  className="input-form"
                  type="email"
                  name="email"
                  value={user.email}
                  placeholder="Digite seu email"
                  onChange={handleChange}
                />
              </div>
              <div className="container-input">
                <p className="label-form">Username</p>
                <Form.Control
                  className="input-form"
                  type="text"
                  name="username"
                  value={user.username}
                  placeholder="Digite seu username"
                  onChange={handleChange}
                />
              </div>
              <div className="container-input">
                <p className="label-form">Telefone</p>
                <Form.Control
                  className="input-form"
                  type="number"
                  name="numero"
                  value={user.numero}
                  placeholder="Digite seu numero"
                  onChange={handleChange}
                />
              </div>
              <div className="container-input">
                <p className="label-form">Descrição</p>
                <Form.Control
                  className="input-form"
                  type="text"
                  name="descricao"
                  value={user.descricao}
                  placeholder="Digite sua descrição "
                  onChange={handleChange}
                />
              </div>
              <button className="insert-button" type="submit" onClick={sendToAvatarConfirm}>
                {inputAvatar ? "Enviar" : "Próximo"}
              </button>
            </div>
            <div className="container-image">
              <img src={Photo} alt="" />
            </div>
          </form>
        </>
      )}
    </>
  );
}
