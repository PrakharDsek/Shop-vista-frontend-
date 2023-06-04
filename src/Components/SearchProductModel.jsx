import styled from "styled-components";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import {useSelector} from "react-redux"
import {toast} from "react-hot-toast"
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchProductModel = ({
  ImageURL,
  Name,
  Offer,
  Description,
  ProductPrice,
  icon,
  BackendURL,
  ProductId,
  functionDelete
}) => {
  const {UserAuthData} =useSelector((state) => state.Auth)
    const NavigateTo = useNavigate();
  const AddToCart = async () => {
    try {
      const CartProduct = await axios.put(`${BackendURL}/cart/add`, {
        productId: ProductId,
        userId: UserAuthData.data._id,
      });
      toast.success("SuccessFully Added to cart");
    } catch (error) {
      toast.error("An error occured");
    }
  };
  const deleteProduct=async () => {
    try {
      const removeProduct=await axios.delete(`${BackendURL}/products/delete?productId=${ProductId}`,{withCredentials:true})
      toast.success("Deleted the product")
    } catch (error) {
      toast.error("An error occured")
    }
  }
  return (
    <Container className="CartModel">
      <Content onClick={() => NavigateTo(`/product/${ProductId}`)}>
        {icon == "delete" ? (
          <DeleteIcon
            style={{ margin: "1em", cursor: "pointer", hover: "color:red" }}
            onClick={deleteProduct}
          />
        ) : (
          <AddShoppingCartIcon
            onClick={AddToCart}
            style={{ margin: "1em", cursor: "pointer", hover: "color:red" }}
          />
        )}
        <ContentLeft>
          <ProductImage src={ImageURL} />
          <ProductDisc>
            <Heading>{Name}</Heading>
            <LightPara>{Offer}</LightPara>
            <ProductDetails>{Description}</ProductDetails>
          </ProductDisc>
        </ContentLeft>
        <ContentRight>
          <Price>₹{ProductPrice}</Price>
        </ContentRight>
      </Content>
    </Container>
  );
};

export default SearchProductModel;

const Container = styled.div`
  width: 100%;

  position: relative;
`;
const Content = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 0.1em;
  padding: 1em;
  margin: 1em 1em;
  height: 5%;
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
  font-size: 1.5rem;
  color: black;
  line-height: 4%;
`;
const LightPara = styled.p`
  font-size: 0.9rem;
  color: black;
`;
const ProductDetails = styled.p`
  width: 100%;
  height: 100%;
  color: black;
`;
const Price = styled.h5`
  font-size: 1.6rem;
  margin: 2rem 0 0 0;
  color: black;
`;

const ProductDisc = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5em;
`;
