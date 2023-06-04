import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductShowcaser from "../Components/ProductShowCaser";
import axios from "axios"
import { useState } from "react";
import { useEffect } from "react";
import { Skeleton } from "@mui/material";


const Products = ({BackendURL}) => {
  const [DiscoundProducts ,setDiscountProducts]=useState()
    const FetchProductsDiscount = async (category, type) => {
      const Products = await axios.get(
        `${BackendURL}/products/get?type=${type}&category=${category}`
      );
      setDiscountProducts(Products.data.data);
    };
    const handleSlider = (direction, scroll, id) => {
      const container = document.getElementById(id);
      if (direction == "left") {
        if (container) {
          container.scrollTo({
            left: container.scrollLeft + scroll, // Adjust the scroll amount as needed
            behavior: "smooth",
          });
        }
      } else {
        if (container) {
          container.scrollTo({
            left: container.scrollLeft + -scroll, // Adjust the scroll amount as needed
            behavior: "smooth",
          });
        }
      }
    };
    useEffect(() => {
      FetchProductsDiscount();
    })
  return (
    <Container>
      <Content>
        <Discount>
          <Heading>Discounts</Heading>
          <HomeProductsFeatured id="ProductsTop">
            <ArrowBackIosIcon
              onClick={() => handleSlider("right", 300, "ProductsTop")}
              style={{
                position: "absolute",
                left: "60px",
                zIndex: "999",
                borderRadius: "12px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                color: "#fff",
                backgroundColor: "var(--Sliderbutton_bg)",
                height: "20%",
                padding: "9px",
              }}
            />

            {DiscoundProducts ? (
              DiscoundProducts.map((i) => (
                <>
                  <ProductShowcaser
                    ImgUrl={
                      i.Image
                        ? i.Image
                        : "https://m.media-amazon.com/images/I/31wacBawB3L._AC_SY200_.jpg"
                    }
                    Name={i.Name}
                    ProductId={i._id}
                    Type={`Discount ${i.Discount}%`}
                    Price={i.Price}
                  />
                </>
              ))
            ) : (
              <>
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    style={{
                      margin: "20px",
                      border: "1px solid lightgray",
                      padding: "12px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton width="80%" height="10px" />
                    <Skeleton width="150px" height="150px" />
                    <Skeleton width="60%" height="15px" />
                    <Skeleton width="40%" height="12px" />
                    <Skeleton width="100px" height="30px" />
                  </div>
                ))}
              </>
            )}
            <ArrowForwardIosIcon
              onClick={() => handleSlider("left", 300, "ProductsTop")}
              style={{
                position: "absolute",
                right: "64px",
                zIndex: "999",
                borderRadius: "12px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                color: "#fff",
                backgroundColor: "var(--Sliderbutton_bg)",
                height: "20%",
                padding: "9px",
              }}
            />
          </HomeProductsFeatured>
        </Discount>
        <BestOffers>
          <Heading>Best Offers</Heading>
          <HomeProductsFeatured id="ProductsTop2">
            <ArrowBackIosIcon
              onClick={() => handleSlider("right", 300, "ProductsTop2")}
              style={{
                position: "absolute",
                left: "60px",
                zIndex: "999",
                borderRadius: "12px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                color: "#fff",
                backgroundColor: "var(--Sliderbutton_bg)",
                height: "20%",
                padding: "9px",
              }}
            />

            {DiscoundProducts ? (
              DiscoundProducts.map((i) => (
                <>
                  <ProductShowcaser
                    ImgUrl={
                      i.Image
                        ? i.Image
                        : "https://m.media-amazon.com/images/I/31wacBawB3L._AC_SY200_.jpg"
                    }
                    Name={i.Name}
                    ProductId={i._id}
                    Type={`Best Offers`}
                    Price={i.Price}
                  />
                </>
              ))
            ) : (
              <>
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    style={{
                      margin: "20px",
                      border: "1px solid lightgray",
                      padding: "12px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton width="80%" height="10px" />
                    <Skeleton width="150px" height="150px" />
                    <Skeleton width="60%" height="15px" />
                    <Skeleton width="40%" height="12px" />
                    <Skeleton width="100px" height="30px" />
                  </div>
                ))}
              </>
            )}
            <ArrowForwardIosIcon
              onClick={() => handleSlider("left", 300, "ProductsTop2")}
              style={{
                position: "absolute",
                right: "64px",
                zIndex: "999",
                borderRadius: "12px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                color: "#fff",
                backgroundColor: "var(--Sliderbutton_bg)",
                height: "20%",
                padding: "9px",
              }}
            />
          </HomeProductsFeatured>
        </BestOffers>
        <FreeDelivery>
          <Heading>Free Delivery</Heading>
          <HomeProductsFeatured id="ProductsTop3">
            <ArrowBackIosIcon
              onClick={() => handleSlider("right", 300, "ProductsTop3")}
              style={{
                position: "absolute",
                left: "60px",
                zIndex: "999",
                borderRadius: "12px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                color: "#fff",
                backgroundColor: "var(--Sliderbutton_bg)",
                height: "20%",
                padding: "9px",
              }}
            />

            {DiscoundProducts ? (
              DiscoundProducts.map((i) => (
                <>
                  <ProductShowcaser
                    ImgUrl={
                      i.Image
                        ? i.Image
                        : "https://m.media-amazon.com/images/I/31wacBawB3L._AC_SY200_.jpg"
                    }
                    Name={i.Name}
                    ProductId={i._id}
                    Type={`Free Delivery`}
                    Price={i.Price}
                  />
                </>
              ))
            ) : (
              <>
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    style={{
                      margin: "20px",
                      border: "1px solid lightgray",
                      padding: "12px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton width="80%" height="10px" />
                    <Skeleton width="150px" height="150px" />
                    <Skeleton width="60%" height="15px" />
                    <Skeleton width="40%" height="12px" />
                    <Skeleton width="100px" height="30px" />
                  </div>
                ))}
              </>
            )}
            <ArrowForwardIosIcon
              onClick={() => handleSlider("left", 300, "ProductsTop3")}
              style={{
                position: "absolute",
                right: "64px",
                zIndex: "999",
                borderRadius: "12px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                color: "#fff",
                backgroundColor: "var(--Sliderbutton_bg)",
                height: "20%",
                padding: "9px",
              }}
            />
          </HomeProductsFeatured>
        </FreeDelivery>
      </Content>
    </Container>
  );
};

export default Products;

const Container = styled.div`
  @media (max-width: 760px) {
    .MuiSvgIcon-root {
      background-color: transparent !important;
      height: 5% !important;
      color: black !important;
    }
  }
`;
const Discount=styled.div``
const Content=styled.div``
const BestOffers=styled.div``
const Sale=styled.div``
const FreeDelivery=styled.div``
const HomeProductsFeatured = styled.div`
  display: flex;
  text-align: center;
  align-items: center;

  overflow: hidden;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
    scroll-behavior: smooth;
  }
  & .ProductShowCaser {
    margin: 0 2rem;
    @media (max-width: 760px) {
      width: 20%;
    }
  }
`;

const Heading = styled.h1`
  color: black;
  font-size: 1.8rem;
  text-align: center;
`;

