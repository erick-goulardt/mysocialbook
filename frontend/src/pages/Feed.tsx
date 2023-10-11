import Create from "../assets/create.svg";
import Home from "../assets/iconhome.svg";
import Friends from "../assets/friends.svg";
import Engine from "../assets/engine.svg";
import Search from "../assets/search.svg";
import Icon from "../assets/homeicon.svg";
import Logo from "../assets/homelogo.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserProfile } from "../context/UserContext";
import { IPosts, getFriendsPosts } from "../api/posts.service";
import Post from "../components/Posts";
import "../css/feed.style.css"

export function Feed() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<IPosts[]>([]);
  const navigate = useNavigate();
  const [searchedUsername, setSearchedUsername] = useState("");
  const { setUserProfileData } = useUserProfile();

  useEffect(() => {
    const userId = "65248b3dfaa0955d42bef38c";

    getFriendsPosts(userId)
      .then((data) => {
        if (data) {
          setPosts(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const returnBack = () => {
    navigate("/profile");
  };

  const toConfig = () => {
    navigate("/profile/config");
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearch = () => {
    setUserProfileData({ username: searchedUsername });
    navigate(`/profile/${searchedUsername}`);
  };
  return (
    <>
      <div className="main-container">
        <div className="container-list">
          <div className="title-header">
            <svg
              onClick={returnBack}
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.5531 4.35312C15.549 3.35729 15.549 1.74271 14.5531 0.746878C13.5573 -0.248959 11.9427 -0.248959 10.9469 0.746878L0.746878 10.9469C-0.248959 11.9427 -0.248959 13.5573 0.746878 14.5531L10.9469 24.7531C11.9427 25.749 13.5573 25.749 14.5531 24.7531C15.549 23.7573 15.549 22.1427 14.5531 21.1469L8.70624 15.3H22.95C24.3583 15.3 25.5 14.1583 25.5 12.75C25.5 11.3417 24.3583 10.2 22.95 10.2H8.70625L14.5531 4.35312Z"
                fill="#F37671"
              />
            </svg>
            <img src={Icon} className="logo" alt="" />
            <img src={Logo} className="icon" alt="" />
          </div>
          <ul>
            <li className="item-list">
              <img src={Home} alt="Home" /> <h5 className="text-list">Feed</h5>
            </li>
            <li className="item-list">
              <img src={Friends} alt="Home" />{" "}
              <h5 className="text-list">Amigos</h5>
            </li>
            <li className="item-list">
              <img src={Home} alt="Home" />{" "}
              <h5 className="text-list">Perfil</h5>
            </li>
            <li className="item-list" onClick={toConfig}>
              <img src={Engine} alt="Home" />{" "}
              <h5 className="text-list">Configurações</h5>
            </li>
            <li className="item-list">
              <img src={Create} alt="Home" />{" "}
              <h5 className="text-list">Criar</h5>
            </li>
            <li className="item-list" onClick={handleModal}>
              <img src={Search} alt="Home" />{" "}
              <h5 className="text-list">Procurar</h5>
            </li>
          </ul>
        </div>
        <div className="feed">
          {posts.map((post, id) => (
            <Post key={id} imageUrl={post.urlImage}/>
          ))}
        </div>
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
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-title">
              <h4>Procure outros usuários</h4>
            </div>
            <div className="modal-buttons">
              <div className="modal-input">
                <label htmlFor="name">Username</label>
                <br />
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={searchedUsername}
                  onChange={(e) => setSearchedUsername(e.target.value)}
                />
              </div>
              <button onClick={handleModal}>Cancelar</button>
              <button onClick={handleSearch}>Procurar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Feed;
