import FetchUserFavorites from "@/components/shared/FetchUserFavorites";
import FetchUserFollowings from "@/components/shared/FetchUserFollowings";
import { useGetUserByIdQuery } from "@/lib/react-query/queries-and-mutations";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/shared/Loader";

const Favorites = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { userInfo } = useSelector((state) => state.auth);

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!userInfo) {
      navigate("/sign-in");
      return;
    }
  }, [auth, navigate, userInfo]);

  const { data: user, isPending } = useGetUserByIdQuery(auth?.user?.id);

  useEffect(() => {
    if (location.pathname === "/favorites") {
      document.title = "Favorites | Shop";
    }
  }, [location.pathname]);

  if (isPending) {
    return (
      <div className="w-full flex items-center justify-center mt-24">
        <Loader />
      </div>
    );
  }

  return (
    <section className="w-full flex flex-col gap-y-12 px-4 sm:px-12 md:px-20 lg:px-44 mt-16">
      <FetchUserFollowings userFollowings={user?.data?.followings} />
      <FetchUserFavorites userFavorites={user?.data?.favorites} />
    </section>
  );
};

export default Favorites;
