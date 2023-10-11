import ReactDOM from "react-dom/client";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserProfileProvider } from "./context/UserContext.tsx";
import { AppRoutes } from "./routes/AppRoutes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <UserProfileProvider>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </UserProfileProvider>
  </AuthProvider>
);
