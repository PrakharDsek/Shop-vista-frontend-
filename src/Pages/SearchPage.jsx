import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import SearchProductModel from "../Components/SearchProductModel";
import { useEffect } from "react";

const SearchPage = ({ BackendURL }) => {
  const [searchParams] = useSearchParams();
  const [Products, setProducts] = useState("");
  const query = searchParams.get("query");
  const SearchProduct = async () => {
    const Product = await axios.get(`${BackendURL}/search?query=${query}`);
    setProducts(Product.data.data);
  };
  useEffect(() => {
    SearchProduct();
  },[query]);
  return (
    <Container>
      <Content>
        <ContentMiddle>
          <Heading>
            Products related to: <span>{query}</span>
          </Heading>
          <ProductContainer>
            {Products
              ? Products.map((i) => (
                  <>
                    <SearchProductModel BackendURL={BackendURL} ImageURL={i.ImageURL} Name={i.Name}  Description={i.Description} ProductPrice={i.Price} Offer={i.Offers[1]} ProductId={i._id} />
                  </>
                ))
              : "No product found "}
          </ProductContainer>
        </ContentMiddle>
      </Content>
    </Container>
  );
};

export default SearchPage;

const Container = styled.div`
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
`;

const ContentMiddle = styled.div`
  flex: 9;
  display: flex;

  margin: 2em;
  flex-direction: column;
`;

const ProductContainer = styled.div`
  width: 100%;

  & .CartModel {
    width: 100%;

  }
`;

const Heading = styled.h1`
  color: black;
  font-size: large;
  & span {
    color: rgba(0, 0, 0, 0.6);
  }
`;
