import { useCheckAuthStatusQuery } from "@/lib/react-query/queries-and-mutations";
import { User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

type UserAuth = {
  user: User | null;
  isLoading: boolean;
  isPending: boolean;
  token: string | null | undefined;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { userInfo } = useSelector((state) => state.auth);

  const [user, setUser] = useState<User | null>(null);

  const userInfoStorage = localStorage.getItem("userInfo");
  const userInfoObj = JSON.parse(userInfoStorage!);
  const token = userInfoObj?.token;

  const {
    data,
    isPending,
    isLoading,
    refetch: statusRefetch,
  } = useCheckAuthStatusQuery(token);

  useEffect(() => {
    function checkStatus() {
      if (data) {
        setUser({
          id: data.data.id,
          name: data.data.name,
          username: data.data.username,
          email: data.data.email,
          isAdmin: data.data.isAdmin,
          profilePic: data.data.profilePic,
        });
      }
    }

    checkStatus();
  }, [data]);

  useEffect(() => {
    statusRefetch();
  }, [statusRefetch, userInfo]);

  const value = {
    user,
    isLoading,
    isPending,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
