//import { useAuth } from "../auth/AuthProvider";
import Create from "../assets/create.svg";
import Home from "../assets/iconhome.svg";
import Friends from "../assets/friends.svg";
import Engine from "../assets/engine.svg";
import Search from "../assets/search.svg";
import Icon from "../assets/homeicon.svg";
import Logo from "../assets/homelogo.svg";
import "../css/profile.style.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IPosts, getUsersPosts } from "../api/posts.service";
import Post from "../components/Posts";

export function Profile() {
  const [posts, setPosts] = useState<IPosts[]>([]);

  useEffect(() => {
    const userId = "652387183c65e1037da318dc";

    getUsersPosts(userId)
      .then((data) => {
        if (data) {
          setPosts(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const navigate = useNavigate();
  const returnBack = () => {
    navigate("/");
  };

  const toConfig = () => {
    navigate("/profile/config");
  };
  //const user = useAuth();
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
            <li className="item-list">
              <img src={Search} alt="Home" />{" "}
              <h5 className="text-list">Procurar</h5>
            </li>
          </ul>
        </div>
        <div className="container-content">
          <div className="user-info">
            <img src={Engine} alt="" className="image-profile" />
            <div className="user-data">
              <h3>Erick</h3>
              <p>Descrição foda</p>
            </div>
          </div>
          <div className="user-numbers">
            <b className="data">50</b>
            <b className="data">|</b>
            <b className="data">100</b>
          </div>
          <div className="title-data">
            <p className="data">Friends</p>
            <p className="data">Posts</p>
          </div>
          <div className="grid">
              {posts.map((post, index) => (
                <Post
                  key={index}
                  imageUrl={post.urlImage}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
