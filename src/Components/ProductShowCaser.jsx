import { motion } from "framer-motion";
import styled from "styled-components";
import Skeleton from "react-skeleton";
import { useNavigate } from "react-router-dom";

const ProductShowCaser = ({
  initial,
  transition,
  animate,
  onEnded,
  ImgUrl,
  Name,
  Price,
  Type,
  ProductId,
  style,
  mode
}) => {
  const NavigateTo = useNavigate();
 
    const handlePageNav = () => {
      if (mode == "update") {
        NavigateTo(`/product/update/${ProductId}`);
      } else {
         NavigateTo(`/product/${ProductId}`);
      }
    };
  return (
    <Container
    style={style}
      onClick={handlePageNav}
      initial={initial}
      animate={animate}
      transition={transition}
      onEnded={onEnded}
      className="ProductShowCaser"
    >
      <Content>
        <ProductType>{Type}</ProductType>
        <ProductImage src={ImgUrl} />
        <ProductName>{Name}</ProductName>
        <ProductPrice>
          Starting from &#8377;
          {Price}
        </ProductPrice>
        <AddToCartBtn>{mode ? "Update" :"Add to Cart"}</AddToCartBtn>
      </Content>
    </Container>
  );
};

export default ProductShowCaser;

const Container = styled(motion.div)`
  width: 10%;
  height: 20%;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 1em;
  padding: 2em;
  position: relative;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductImage = styled.img`
  background-size: contain;
  height: 150px;
  z-index: -4;
  min-height: 100px;
`;

const ProductName = styled.h4`
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");
  color: black;
  font-family: "Montserrat", sans-serif;
  font-size: 0.9rem;
`;
const ProductPrice = styled.p`
  @import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap");
  color: black;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 0.6rem;
`;

const ProductType = styled.h5`
  @import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap");
  color: black;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 0.6rem;
  position: absolute;
  z-index: -9999;
  transform: rotate(-30deg); /* Tilt angle */
  top: 0;
  left: 0;
  background-color: gold;
  border-radius: 2px;
`;

const AddToCartBtn = styled.button`
  padding: 6px;
  border-radius: 4px;
  background-color: gold;
  color: black;
  border: none;
  z-index: -4;
`;
