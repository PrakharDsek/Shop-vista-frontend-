import styled from "styled-components";
import ProductShowCaser from "./ProductShowCaser";
import { useState } from "react";
import axios from "axios";

const UpdateProducts = ({BackendURL, userId}) => {
  console.log(userId)
  const [products, setProduct] = useState([]);
  const getProducts = async () => {
    const getProduct = await axios.get(
      `${BackendURL}/products/getByUserId?userId=${userId}`
    );
    setProduct(getProduct.data.data);
  };
  useState(() => {
    getProducts();
  });
  return (
    <Container>
      <Content>
        <Heading>Update your products</Heading>
        {products ||products.length> 0? products.map((i) => (<>
        <ProductShowCaser
          mode={"update"}
          ImgUrl={i.ImageURL}
          Name={i.Name}
          Price={i.Price}
          Type={""}
          ProductId={i._id}
        />
        </>)):<p style={{color:"black" ,textAlign:"center"}}>No products yet registered</p>}
      </Content>
    </Container>
  );
};

export default UpdateProducts;

const Container = styled.div`
  width:100%;
  height: 100%;
`;
const Content = styled.div`
  width:100%;
  margin:22px;
`;

const Heading = styled.h1`
  color:black;  
  text-align:center ;
`;
