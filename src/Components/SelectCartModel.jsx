import styled from "styled-components";
import { Delete } from "@mui/icons-material";
import { useState } from "react";

const SelectCartModel = ({
  imageURL,
  productName,
  productOffer,
  productPrice,
  RemoveFromCart,
  productId,
  onQuantityChange, // New prop to handle quantity change
}) => {
  const [cartProductQuantity, setCartProductQuantity] = useState(1);

  const handleIncrementAndDecrement = (req) => {
    switch (req) {
      case "inc":
        setCartProductQuantity((prev) => prev += 1);
        break;
      case "dec":
        setCartProductQuantity((prev) => {
          if (prev === 1) {
            return 1;
          } else {
            return prev -= 1;
          }
        });
        break;
      default:
        break;
    }

    onQuantityChange(productId, cartProductQuantity); // Call onQuantityChange prop with updated quantity
  };
  return (
    <Container className="CartModel">
      <Content>
        <Delete onClick={() => RemoveFromCart(productId)} />
        <ContentLeft>
          <ProductImage src={imageURL} />
          <ProductDisc>
            <Heading>{productName}</Heading>
            <LightPara>{productOffer}</LightPara>
          </ProductDisc>
        </ContentLeft>
        <ContentMiddle>
          <IncrementAndDecrementHub>
            <button
              style={{ color: "white", backgroundColor: "var(--header_bg)" }}
              onClick={() => handleIncrementAndDecrement("dec")}
            >
              -
            </button>
            <Heading>
              {cartProductQuantity - 1 == 0 ? "1" : cartProductQuantity - 1}
            </Heading>
            <button
              style={{ color: "white", backgroundColor: "var(--header_bg)" }}
              onClick={() => handleIncrementAndDecrement("inc")}
            >
              +
            </button>
          </IncrementAndDecrementHub>
        </ContentMiddle>
        <ContentRight>
          <Price>₹ {productPrice}</Price>
        </ContentRight>
      </Content>
    </Container>
  );
};

export default SelectCartModel;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 0.8em;
  padding: 1em;
  margin: 1em 1em;
  & .MuiSvgIcon-root {
    position: absolute;
    right: -50px;
    top: 0;
    color: rgba(0, 0, 0, 0.25);
    cursor: pointer;
    @media (max-width: 760px) {
      right: 0;
    }
  }
  @media (max-width: 760px) {
    margin: 1em 0;
    width: 90%;
  }
`;
const ContentLeft = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
`;
const ContentMiddle = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin: 2rem 0 0 0;
  & button {
    cursor: pointer;
  }
`;
const ContentRight = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProductImage = styled.img`
  width: 25%;
  object-fit: contain;
`;
const Heading = styled.h3`
  font-size: 0.8rem;
  color: black;
  line-height: 4%;
`;
const LightPara = styled.p`
  font-size: 0.5rem;
  color: black;
`;
const IncrementAndDecrementHub = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Price = styled.h5`
  color: black;
  font-size: 0.9rem;
  margin: 2rem 0 0 0;
`;

const ProductDisc = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5em;
`;
