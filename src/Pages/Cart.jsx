import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SelectCartModel from "../Components/SelectCartModel.jsx";
import Subtotal from "../Components/Subtotal.jsx";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Cart = ({ BackendURL }) => {
  const { UserAuthData } = useSelector((state) => state.Auth);
  const [cartProduct, setCartProduct] = useState([]);
  const [cartProductQuantityMap, setCartProductQuantityMap] = useState({});

  const handleQuantityChange = (productId, quantity) => {
    setCartProductQuantityMap((prevMap) => ({
      ...prevMap,
      [productId]: quantity,
    }));
  };
  const GetCart = async () => {
    try {
      const cartResponse = await axios.get(
        `${BackendURL}/cart/myCart?userId=${UserAuthData.data._id}`
      );
      const cartData = cartResponse.data.data[0]; // Assuming there is only one cart in the response

      const CartProductPromises = cartData.CartProductIds.map((productId) =>
        axios.get(`${BackendURL}/products/getById?productId=${productId}`)
      );
      const CartProductResponses = await Promise.all(CartProductPromises);
      const CartProductData = CartProductResponses.map(
        (response) => response.data.data
        );

      // Initialize the cartProductQuantityMap with a quantity of 1 for each product
      const initialCartProductQuantityMap = CartProductData.reduce(
        (map, product) => ({
          ...map,
          [product]: 1,
        }),
        {}
      );

      setCartProduct(CartProductData);
      setCartProductQuantityMap(initialCartProductQuantityMap);
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    }
  };

  const RemoveFromCart = async (productId) => {
    try {
      await axios.delete(
        `${BackendURL}/cart/remove?userId=${
          UserAuthData.data._id}&productId=${productId}`,
        {
          withCredentials: true,
        }
      );
      GetCart();
      toast.success("Removed from cart");
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    }
  };
  
  useEffect(() => {
    GetCart();
  }, []);

  
  return (
    <Container>
      <Content>
        <CartProducts>
          <Heading>Cart</Heading>
          {cartProduct && cartProduct.length !== 0 ? (
            cartProduct.map((product) => (
              <SelectCartModel
                key={product ? product._id :""}
                imageURL={product ? product.ImageURL :""}
                productName={product ? product.Name :""}
                productOffer={product ? product.Offers :""}
                productPrice={product ? product.Price :5}
                RemoveFromCart={RemoveFromCart}
                productId={product ? product._id :""}
                onQuantityChange={handleQuantityChange} // Pass the handleQuantityChange function as a prop
              />
            ))
          ) : (
            <Heading style={{ fontSize: "1em" }}>
              You cart is currently empty
            </Heading>
          )}
        </CartProducts>
        <CartSubTotal>
          <Subtotal
            quantity={cartProductQuantityMap} // Pass the cartProductQuantityMap as quantity prop
            cartProduct={cartProduct}
          />
        </CartSubTotal>
      </Content>
    </Container>
  );
};

export default Cart;
const Container = styled.div`
  width: 100%;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 760px) {
    flex-direction: column;
  }
  position: relative;
`;
const Heading = styled.h1`
  color: black;
  margin: 2rem;
  line-height: 0%.2em;
  @media (max-width: 760px) {
    text-align: center;
  }
`;
const CartProducts = styled.div`
  width: 50%;
  height: 50%;
  margin: 0 0 4rem 0;
  @media (max-width: 760px) {
    width: 80%;
    margin: 0;
    padding: 0;
  }
`;
const CartSubTotal = styled.div`
  width: 30%;
  margin: 2rem 4rem 0rem 0;
  @media (max-width: 760px) {
    width: 100%;
    height: 40%;
    margin: 0;
    position: fixed;
    bottom: 0;
    background-color: var(--header_bg);
    z-index: 999999;
  }
`;
