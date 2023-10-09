import { Route, Routes } from "react-router-dom";
import { Profile } from "../pages/Profile";

export function PrivateRoutes() {
    return (
        <Routes>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/profile/config" element={<Profile/>}/>
        </Routes>
    );
}