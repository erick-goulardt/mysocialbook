import { ReactNode, createContext, useContext, useState } from "react";

interface UserProfileContextType {
  userData: UserProfile | null;
  setUserProfileData: (data: UserProfile | null) => void;
}

interface UserProfile {
  username: string;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined
);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserProfile | null>(null);

  const setUserProfileData = (data: UserProfile | null) => {
    setUserData(data);
  };

  return (
    <UserProfileContext.Provider value={{ userData, setUserProfileData }}>
      {children}
    </UserProfileContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
};
