import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import Checkout from "./Pages/Checkout.jsx";
import Payments from "./Pages/Payments.jsx";
import Account from "./Pages/Account.jsx";
import SearchPage from "./Pages/SearchPage.jsx";
import Orders from "./Pages/Orders.jsx";
import Products from "./Pages/Products";
import SellerForm from "./Pages/SellerForm";
import Cart from "./Pages/Cart";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import ProductsInDetail from "./Pages/ProductsInDetail";
import Subscription from "./Pages/Subscription.jsx";
import Register from "./Pages/Register";
import SellerDashboard from "./Pages/SellerDashboard";
import CategoryPage from "./Pages/CategoryPage";
import { Toaster, toast } from "react-hot-toast";
import "./App.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { AuthSetter } from "../Redux/Auth";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import UpdateProductPageInDetail from "./Pages/UpdateProductPageInDetail";

function App() {
  const [IsAuth, setAuth] = useState(false);
  const BackendURL = "http://localhost:3000/api/v1";
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const location = useLocation();

  const CheckUserLoggedIn = async () => {
    try {
      const GetAuthVerify = await axios.post(
        `${BackendURL}/auth/loginId`,
        {},
        {
          withCredentials: true,
        }
      );

      if (GetAuthVerify.data.success == true) {
        setAuth(true);
        dispatch(AuthSetter(GetAuthVerify.data));
      } else {
        setAuth(false);
      }
    } catch (error) {
      toast.error("An error occured");
      console.error(error);
    }
  };
  useEffect(() => {
    CheckUserLoggedIn();
  }, [location]);
  return (
    <>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home BackendURL={BackendURL} />
                <Toaster position="bottom-right" reverseOrder={false} />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Register BackendURL={BackendURL} />} />
          <Route
            path="/home"
            element={
              <>
                <Header />
                <Home BackendURL={BackendURL} />
                <Toaster position="bottom-right" reverseOrder={false} />
                <Footer />
              </>
            }
          />
          <Route
            path="/Cart"
            element={
              <>
                {!IsAuth ? (
                  navigateTo("/login")
                ) : (
                  <>
                    <Header />
                    <Cart BackendURL={BackendURL} />
                    <Toaster position="bottom-right" reverseOrder={false} />
                    <Footer />
                  </>
                )}
              </>
            }
          />
          <Route
            path="/product/:ProductId"
            element={
              <>
                <Header />
                <ProductsInDetail BackendURL={BackendURL} />
                <Toaster position="bottom-right" reverseOrder={false} />

                <Toaster position="bottom-right" reverseOrder={false} />
                <Footer />
              </>
            }
          />
          <Route
            path="/product/update/:ProductId"
            element={
              <>
                <Header />
                <UpdateProductPageInDetail BackendURL={BackendURL} />
                <Toaster position="bottom-right" reverseOrder={false} />

                <Toaster position="bottom-right" reverseOrder={false} />
                <Footer />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <>
                <Header />
                <Products BackendURL={BackendURL} />
                <Toaster position="bottom-right" reverseOrder={false} />
                <Footer />
              </>
            }
          />
          <Route
            path="/payments"
            element={
              <>
                {!IsAuth ? (
                  navigateTo("/login")
                ) : (
                  <>
                    <Header />
                    <Payments BackendURL={BackendURL} />
                    <Toaster position="bottom-right" reverseOrder={false} />
                    <Footer />
                  </>
                )}
              </>
            }
          />
          <Route
            path="/accounts"
            element={
              <>
                {!IsAuth ? (
                  navigateTo("/login")
                ) : (
                  <>
                    <Header />
                    <Account BackendURL={BackendURL} />
                    <Toaster position="bottom-right" reverseOrder={false} />
                    <Footer />
                  </>
                )}
              </>
            }
          />
          <Route
            path="/sellerForm"
            element={
              <>
                {!IsAuth ? (
                  navigateTo("/login")
                ) : (
                  <>
                    <Header />
                    <SellerForm BackendURL={BackendURL} />
                    <Toaster position="bottom-right" reverseOrder={false} />
                    <Footer />
                  </>
                )}
              </>
            }
          />
          <Route
            path="/search"
            element={
              <>
                <Header />
                <SearchPage BackendURL={BackendURL} />
                <Toaster position="bottom-right" reverseOrder={false} />
                <Footer />
              </>
            }
          />
          <Route
            path="/category"
            element={
              <>
                <Header />
                <CategoryPage BackendURL={BackendURL} />
                <Toaster position="bottom-right" reverseOrder={false} />
                <Footer />
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                {!IsAuth ? (
                  navigateTo("/login")
                ) : (
                  <>
                    <Header />
                    <Orders BackendURL={BackendURL} />
                    <Toaster position="bottom-right" reverseOrder={false} />
                    <Footer />
                  </>
                )}
              </>
            }
          />
          <Route
            path="/subscription"
            element={
              <>
                {!IsAuth ? (
                  navigateTo("/login")
                ) : (
                  <>
                    <Header />
                    <Subscription BackendURL={BackendURL} />
                    <Toaster position="bottom-right" reverseOrder={false} />
                    <Footer />
                  </>
                )}
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                {!IsAuth ? (
                  navigateTo("/login")
                ) : (
                  <>
                    <Header />
                    <Checkout BackendURL={BackendURL} />
                    <Toaster position="bottom-right" reverseOrder={false} />
                    <Footer />
                  </>
                )}
              </>
            }
          />
          <Route
            path="/SellerDashboard"
            element={
              <>
                {!IsAuth ? (
                  navigateTo("/login")
                ) : (
                  <>
                    <Header />
                    <SellerDashboard BackendURL={BackendURL} />
                    <Toaster position="bottom-right" reverseOrder={false} />
                    <Footer />
                  </>
                )}
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
