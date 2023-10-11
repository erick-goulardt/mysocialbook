import { useAuth } from "../auth/AuthProvider";
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
import { IPosts, createPost, getUsersPosts } from "../api/posts.service";
import Post from "../components/Posts";
import { useUserProfile } from "../context/UserContext";
import { IGetProfile, getProfile } from "../api/profile.service";

export function Profile() {
  const user = useAuth();
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [searchedUsername, setSearchedUsername] = useState("");
  const { setUserProfileData } = useUserProfile();
  const [profileData, setProfileData] = useState<IGetProfile | null>();
  const [description, setDescription] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string>('');

  console.log(description)
  console.log(title)
  console.log(photoUrl)

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        if (user.user?.id) {
          const profile = await getProfile(user.user.username);
          if (profile) {
            setProfileData(profile);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadUserProfile();
  }, [user.user?.id, user.user?.username]);

  useEffect(() => {
    if (profileData?.id) {
      getUsersPosts(profileData.id)
        .then((data) => {
          if (data) {
            setPosts(data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [profileData?.id]);

  const navigate = useNavigate();
  const returnBack = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toConfig = () => {
    navigate("/profile/config");
  };

  const toFeed = () => {
    navigate("/feed");
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalCreate = () => {
    setIsModalCreateOpen(!isModalCreateOpen);
  };

  const handleSearch = () => {
    setUserProfileData({ username: searchedUsername });
    navigate(`/profile/${searchedUsername}`);
  };

  const handleCreatePost = async (event: React.FormEvent) => {
    event.preventDefault();

    const postData = {
      title: title,
      description: description,
      photoUrl: photoUrl,
    };
    
    try {
      if (user.user?.id) {
        const createdPost = await createPost(user.user?.id, postData);
        console.log(createdPost)
        if (createdPost) {
          console.log("Post created:", createdPost);
        } else {
          console.error("Erro ao criar o post");
        }
      }
    } catch (error) {
      console.error("Erro na solicitação da API:", error);
    }
    setIsModalCreateOpen(!isModalCreateOpen);
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
            <li className="item-list" onClick={toFeed}>
              <img src={Home} alt="Home" /> <h5 className="text-list">Feed</h5>
            </li>
            <li className="item-list">
              <img src={Friends} alt="Home" />{" "}
              <h5 className="text-list">Amigos</h5>
            </li>
            <li className="item-list">
              <img
                src={profileData?.urlAvatar}
                className="icon-list"
                alt="Home"
              />{" "}
              <h5 className="text-list">Perfil</h5>
            </li>
            <li className="item-list" onClick={toConfig}>
              <img src={Engine} alt="Home" />{" "}
              <h5 className="text-list">Configurações</h5>
            </li>
            <li className="item-list" onClick={handleModalCreate}>
              <img src={Create} alt="Home" />{" "}
              <h5 className="text-list">Criar</h5>
            </li>
            <li className="item-list" onClick={handleModal}>
              <img src={Search} alt="Home" />{" "}
              <h5 className="text-list">Procurar</h5>
            </li>
          </ul>
        </div>
        <div className="container-content">
          <div className="user-info">
            <img
              src={profileData?.urlAvatar}
              alt=""
              className="image-profile"
            />
            <div className="user-data">
              <h3>{profileData?.username}</h3>
              <p>{profileData?.description}</p>
            </div>
          </div>
          <div className="user-numbers">
            <b className="data">{profileData?.friends.length}</b>
            <b className="data">|</b>
            <b className="data">{profileData?.posts.length}</b>
          </div>
          <div className="title-data">
            <p className="data">Friends</p>
            <p className="data">Posts</p>
          </div>
          <div className="grid">
            {posts.map((post, id) => (
              <Post key={id} imageUrl={post.urlImage} />
            ))}
          </div>
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
      {isModalCreateOpen && (
        <form className="modal" onSubmit={handleCreatePost}>
          <div className="modal-content">
            <div className="modal-title">
              <h4>Crie seu post!</h4>
            </div>
            <div className="modal-buttons">
              <div className="modal-input">
                <label htmlFor="name">Título</label>
                <br />
                <input
                  type="text"
                  id="name"
                  name="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="modal-input">
                <label htmlFor="name">Descrição</label>
                <br />
                <input
                  type="text"
                  id="name"
                  name="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="modal-input">
                <label htmlFor="name">URL da Imagem</label>
                <br />
                <input
                  type="text"
                  id="name"
                  name="photoUrl"
                  required
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>
              <button onClick={handleModalCreate} className="create-button">
                Cancelar
              </button>
              <button type="submit" className="create-button">
                Criar
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
