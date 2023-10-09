//import { useAuth } from "../auth/AuthProvider";
import { useState } from "react";
import "../css/edit.style.css";
import { useNavigate } from "react-router-dom";
export function Edit() {
  //const user = useAuth();
  const navigate = useNavigate();
  const returnBack = () => {
    navigate("/profile/config")
  };

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: 0,
    email: "",
    username: "",
    description: "",
    imageUrl: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      name: "",
      phoneNumber: 0,
      email: "",
      username: "",
      description: "",
      imageUrl: "",
      password: "",
    });
  };

  return (
    <>
      <div className="main-container">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="container-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              onClick={returnBack}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.5531 4.35312C15.549 3.35729 15.549 1.74271 14.5531 0.746878C13.5573 -0.248959 11.9427 -0.248959 10.9469 0.746878L0.746878 10.9469C-0.248959 11.9427 -0.248959 13.5573 0.746878 14.5531L10.9469 24.7531C11.9427 25.749 13.5573 25.749 14.5531 24.7531C15.549 23.7573 15.549 22.1427 14.5531 21.1469L8.70624 15.3H22.95C24.3583 15.3 25.5 14.1583 25.5 12.75C25.5 11.3417 24.3583 10.2 22.95 10.2H8.70625L14.5531 4.35312Z"
                fill="#F37671"
              />
            </svg>
            <div className="edit-profilebox">
              <h1 className="edit-profile">Editar Perfil</h1>
            </div>
          </div>
          <div className="container-input">
            <label htmlFor="name">Nome</label>
            <br />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="container-input">
            <label htmlFor="phoneNumber">Número</label>
            <br />
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <br />
          </div>

          <div className="container-input">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <br />
          </div>

          <div className="container-input">
            <label htmlFor="username">Username</label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <br />
          </div>

          <div className="container-input">
            <label htmlFor="description">Descrição</label>
            <br />
            <input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <br />
          </div>

          <div className="container-input">
            <label htmlFor="imageUrl">URL de Imagem</label>
            <br />
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
            <br />
          </div>

          <div className="container-input">
            <label htmlFor="password">Senha</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br />
            <button type="submit" className="button-edit">
              Atualizar
            </button>
          </div>
        </form>
        <div className="container-deco">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="151"
            height="170"
            viewBox="0 0 151 150"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M149.576 1.23512H98.176C45.1632 1.23512 2.18778 44.0911 2.18778 96.9567V148.214H149.576V1.23512ZM98.176 0C44.4791 0 0.949219 43.409 0.949219 96.9567V149.449H150.815V0H98.176Z"
              fill="#F37671"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="151"
            height="170"
            viewBox="0 0 151 150"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M149.576 1.23512H98.176C45.1632 1.23512 2.18778 44.0911 2.18778 96.9567V148.214H149.576V1.23512ZM98.176 0C44.4791 0 0.949219 43.409 0.949219 96.9567V149.449H150.815V0H98.176Z"
              fill="#F37671"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="151"
            height="170"
            viewBox="0 0 151 150"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M149.576 1.23512H98.176C45.1632 1.23512 2.18778 44.0911 2.18778 96.9567V148.214H149.576V1.23512ZM98.176 0C44.4791 0 0.949219 43.409 0.949219 96.9567V149.449H150.815V0H98.176Z"
              fill="#F37671"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="151"
            height="170"
            viewBox="0 0 151 150"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M149.576 1.23512H98.176C45.1632 1.23512 2.18778 44.0911 2.18778 96.9567V148.214H149.576V1.23512ZM98.176 0C44.4791 0 0.949219 43.409 0.949219 96.9567V149.449H150.815V0H98.176Z"
              fill="#F37671"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="151"
            height="170"
            viewBox="0 0 151 150"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M149.576 1.23512H98.176C45.1632 1.23512 2.18778 44.0911 2.18778 96.9567V148.214H149.576V1.23512ZM98.176 0C44.4791 0 0.949219 43.409 0.949219 96.9567V149.449H150.815V0H98.176Z"
              fill="#F37671"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="151"
            height="170"
            viewBox="0 0 151 150"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M149.576 1.23512H98.176C45.1632 1.23512 2.18778 44.0911 2.18778 96.9567V148.214H149.576V1.23512ZM98.176 0C44.4791 0 0.949219 43.409 0.949219 96.9567V149.449H150.815V0H98.176Z"
              fill="#F37671"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
