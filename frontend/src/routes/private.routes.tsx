import { Route, Routes } from "react-router-dom";
import { Profile } from "../pages/Profile";
import Feed from "../pages/Feed";
import { Edit } from "../pages/Edit";
import { ProfileSearched } from "../pages/ProfileSearched";

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/config" element={<Profile />} />
      <Route path="/profile/edit" element={<Edit />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/profile/:username" element={<ProfileSearched />} />
    </Routes>
  );
}
