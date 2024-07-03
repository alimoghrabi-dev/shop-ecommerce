import { Route, Routes, useLocation } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/Home";
import SignIn from "./components/forms/SignIn";
import SignUp from "./components/forms/SignUp";
import Profile from "./_root/pages/Profile";
import EditProfile from "./_root/pages/EditProfile";
import EditUserStore from "./components/shared/EditUserStore";
import Product from "./_root/pages/Product";
import CartPage from "./_root/pages/CartPage";
import Favorites from "./_root/pages/Favorites";
import { useEffect } from "react";
import AdminLayout from "./components/admin/AdminLayout";
import AdminHome from "./components/admin/AdminHome";
import AdminStores from "./components/admin/AdminStores";
import AdminEditProduct from "./components/admin/AdminEditProduct";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const auth = useAuth();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      document.title = `Shop | Home`;
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
        <Route path="/profile/edit/:id" element={<EditProfile />} />
        <Route path="/profile/store/:id" element={<EditUserStore />} />
        <Route element={<AdminLayout />}>
          <Route path="/dashboard/admin" element={<AdminHome />} />
          <Route path="/dashboard/admin/stores" element={<AdminStores />} />
          <Route
            path="/dashboard/admin/stores/edit/product/:productId"
            element={<AdminEditProduct />}
          />
        </Route>
      </Routes>

      {!auth?.token || !auth?.user ? (
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      ) : null}
    </>
  );
};

export default App;
