import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/config.style.css"
import { deleteProfile } from "../api/profile.service";
import { useAuth } from "../auth/AuthProvider";

export function Config() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAuth();

  const handleDeleteProfile = () => {
    if(user.user?.id) {
      deleteProfile(user.user.id)
      setIsModalOpen(false);
      navigate("/")
    }
    
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const returnBack = () => {
    navigate("/profile");
  };

  const goToEdit = () => {
    navigate("/profile/edit");
  };

  return (
    <>
      <div className="home-container">
        <div className="semi-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            onClick={returnBack}
            className="return-sign"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.5531 4.35312C15.549 3.35729 15.549 1.74271 14.5531 0.746878C13.5573 -0.248959 11.9427 -0.248959 10.9469 0.746878L0.746878 10.9469C-0.248959 11.9427 -0.248959 13.5573 0.746878 14.5531L10.9469 24.7531C11.9427 25.749 13.5573 25.749 14.5531 24.7531C15.549 23.7573 15.549 22.1427 14.5531 21.1469L8.70624 15.3H22.95C24.3583 15.3 25.5 14.1583 25.5 12.75C25.5 11.3417 24.3583 10.2 22.95 10.2H8.70625L14.5531 4.35312Z"
              fill="#F37671"
            />
          </svg>
          <div className="title-content" onClick={goToEdit}>
            <h3>Editar perfil</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="18"
              viewBox="0 0 11 18"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.527012 0.527208C-0.175932 1.23015 -0.175932 2.36985 0.527012 3.07279L6.45422 9L0.527012 14.9272C-0.175932 15.6302 -0.175932 16.7698 0.527012 17.4728C1.22996 18.1757 2.36965 18.1757 3.0726 17.4728L10.2726 10.2728C10.9755 9.56985 10.9755 8.43015 10.2726 7.72721L3.0726 0.527208C2.36965 -0.175736 1.22996 -0.175736 0.527012 0.527208Z"
                fill="#F37671"
              />
            </svg>
          </div>
          <div className="title-content">
            <h3 onClick={toggleModal}>Excluir perfil</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="18"
              viewBox="0 0 11 18"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.527012 0.527208C-0.175932 1.23015 -0.175932 2.36985 0.527012 3.07279L6.45422 9L0.527012 14.9272C-0.175932 15.6302 -0.175932 16.7698 0.527012 17.4728C1.22996 18.1757 2.36965 18.1757 3.0726 17.4728L10.2726 10.2728C10.9755 9.56985 10.9755 8.43015 10.2726 7.72721L3.0726 0.527208C2.36965 -0.175736 1.22996 -0.175736 0.527012 0.527208Z"
                fill="#F37671"
              />
            </svg>
          </div>
        </div>

        <div className="container-deco">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="151"
            height="155"
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
            height="155"
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
            height="155"
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
            height="155"
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
            height="150"
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
            height="150"
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
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-title">
              <h4>Tem certeza que deseja excluir seu perfil?</h4>
            </div>
            <div className="modal-buttons">
              <button onClick={handleDeleteProfile}>Confirmar</button>
              <button onClick={toggleModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
