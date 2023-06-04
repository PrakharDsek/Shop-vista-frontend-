import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Subtotal = ({ cartProduct, quantity }) => {
  const calculateSubtotal = () => {
    let subtotal = 0;
    let totalDiscount = 0;

    if (cartProduct && cartProduct.length > 0) {
      cartProduct.forEach((product) => {
        const productPrice = parseFloat(product.Price);
        console.log(parseFloat(product.Price))
        const productQuantity = quantity[product._id] || 0;

        if (productPrice >= 0) {
          subtotal += productPrice * productQuantity;
          console.log(subtotal)
          totalDiscount += (product.Discount || 0.2) * productPrice;
        }
      });
    }

    subtotal = Math.max(subtotal, 0);
    totalDiscount = Math.max(totalDiscount, 0);

    const discount = subtotal !== 0 ? totalDiscount / subtotal : 0;
    let grandTotal = subtotal - discount;

    if (grandTotal < 0) {
      grandTotal = 5;
    }

    return {
      subtotal,
      discount,
      grandTotal,
    };
  };

  useEffect(() => {
    calculateSubtotal();
  }, [quantity]);

  const { subtotal, discount, grandTotal } = calculateSubtotal();

  return (
    <Container>
      <Content>
        <Total>
          <Heading>Subtotal</Heading> <Price>₹{subtotal.toFixed(2)}</Price>
        </Total>
        <Offer>
          <Heading>Discount</Heading>{" "}
          <Price>
            {isNaN(discount.toFixed(2)) ? "0.2%" : discount.toFixed(2) + "%"}
          </Price>
        </Offer>
        <GrandTotal>
          <Heading>Grand Total</Heading>
          <Price>₹{grandTotal.toFixed(2)}</Price>
        </GrandTotal>
        <ButtonBuy>
          {Math.abs(grandTotal.toFixed(2) - 0) < 0.001 ? (
            <span
              style={{
                color: "initial",
                textDecoration: "none",
                opacity: 0.5,
              }}
            >
              {/* Render a disabled version of the link */}
              Checkout
            </span>
          ) : (
            <Link
              style={{ color: "initial", textDecoration: "none" }}
              to={`/checkout?total=${grandTotal.toFixed(
                2
              )}&quantity=${encodeURIComponent(
                JSON.stringify(cartProduct.map((i) => (i ? i._id : "")))
              )}`}
            >
              {/* Render the enabled link */}
              Checkout
            </Link>
          )}
        </ButtonBuy>
      </Content>
    </Container>
  );
};
export default Subtotal;
const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  @media (max-width: 760px) {
    padding: 0 12px;
    margin: 0%;
    width: 90%;
  }
`;
const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Offer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const GrandTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ButtonBuy = styled.button`
  background-color: var(--header_bg);
  padding: 1em;
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 0.4rem;
  @media (max-width: 760px) {
    border: 1px solid #fff;
  }
`;
const Heading = styled.h4`
  color: #828282;
  @media (max-width: 760px) {
  }
`;
const Price = styled.h3`
  color: black;
  @media (max-width: 760px) {
    color: white;
  }
`;
