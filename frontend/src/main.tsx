import ReactDOM from "react-dom/client";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Profile } from "./pages/Profile.tsx";
import { Login } from "./pages/Login.tsx";
import { Register } from "./pages/Register.tsx";
import { Edit } from "./pages/Edit.tsx";
import { Config } from "./pages/Config.tsx";
import { Feed } from "./pages/Feed.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/edit" element={<Edit />} />
        <Route path="/profile/config" element={<Config />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
