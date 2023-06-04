import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductShowcaser from "./ProductShowCaser.jsx";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Skeleton } from "@mui/material";

const HomePage = ({ BackendURL }) => {
  const [HomeProducts, setHomeProducts] = useState();
  const [SponseredProducts, setSponseredProducts] = useState();
  const [KitchenProducts, setKitchenProducts] = useState();
  const [ElectronicsProducts, setElectronicsProducts] = useState();
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

  const FetchProductsAll = async (category, type) => {
    const Products = await axios.get(
      `${BackendURL}/products/get?type=${type}&category=${category}`
    );
    setHomeProducts(Products.data.data);
  };

  const FetchProductsSponsered = async () => {
    const Sponsered = await axios.get(`${BackendURL}/products/get/sponsered`);
    setSponseredProducts(Sponsered.data.data);
  };

  const FetchProductsKitchen = async () => {
    const Sponsered = await axios.get(
      `${BackendURL}/products/get?type=category&category=Kitchen`
    );
    setKitchenProducts(Sponsered.data.data);
  };
  const FetchProductsElectronics = async () => {
    const Sponsered = await axios.get(
      `${BackendURL}/products/get?type=category&category=Electronics`
    );
    setElectronicsProducts(Sponsered.data.data);
  };

  useEffect(() => {
    FetchProductsAll("", "all ");
    FetchProductsSponsered();
    FetchProductsElectronics();
    FetchProductsKitchen();
  }, []);
  console.log(SponseredProducts);
  return (
    <Container>
      <Content>
        <HomeTopSlider id="homeSliderContainer">
          <ArrowBackIosIcon
            onClick={() => handleSlider("right", 300, "homeSliderContainer")}
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
          <SponseredProductImageSlider
            oncontextmenu="return false;"
            ondragstart="return false;"
            src="https://m.media-amazon.com/images/I/61OCFjMW7lL._SX3000_.jpg"
          />
          <SponseredProductImageSlider
            oncontextmenu="return false;"
            ondragstart="return false;"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/ssserene/MayART23/OnePlus/GW/10R/TDXUYF_IN_WLD_MayART23_OnePlus_10R_PC_Hero_1500x600._CB589740106_.jpg"
          />
          <SponseredProductImageSlider
            oncontextmenu="return false;"
            ondragstart="return false;"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Laptops/MayART23/Hero/Laptops/PC_Hero_3000x1200_1._CB589349991_.jpg"
          />
          <SponseredProductImageSlider
            oncontextmenu="return false;"
            ondragstart="return false;"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Sports/May/ART/Mainevent/GW/Hero/mainstory/Updated/Mob_Category_Hero_3000x1200_-Rec-Prime--Early-Deal-withoutTag._CB589303267_.jpg"
          />
          <ArrowForwardIosIcon
            onClick={() => handleSlider("left", 300, "homeSliderContainer")}
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
        </HomeTopSlider>
        <ButtonContainer>
          <AnimatePresence></AnimatePresence>
        </ButtonContainer>
        <Heading>Sponsered products of 'D day</Heading>
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
          {SponseredProducts ? (
            SponseredProducts.map((i) => (
              <>
                <ProductShowcaser
                  ProductId={i._id}
                  ImgUrl={
                    i.ImageURL
                      ? i.ImageURL
                      : "https://m.media-amazon.com/images/I/31wacBawB3L._AC_SY200_.jpg"
                  }
                  Name={i.Name}
                  Type={"Kitchen"}
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
        <Heading>Top Products</Heading>
        <HomeProductsFeatured id="Products">
          <ArrowBackIosIcon
            onClick={() => handleSlider("right", 300, "Products")}
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

          {HomeProducts ? (
            HomeProducts.map((i) => (
              <>
                <ProductShowcaser
                  ProductId={i._id}
                  ImgUrl={
                    i.ImageURL
                      ? i.ImageURL
                      : "https://m.media-amazon.com/images/I/31wacBawB3L._AC_SY200_.jpg"
                  }
                  Name={i.Name}
                  Type={"Top "}
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
            onClick={() => handleSlider("left", 300, "Products")}
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
        <Heading>Electronics Products</Heading>
        <HomeProductsFeatured id="Products2">
          <ArrowBackIosIcon
            onClick={() => handleSlider("right", 300, "Products2")}
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

          {ElectronicsProducts ? (
            ElectronicsProducts.map((i) => (
              <>
                <ProductShowcaser
                  ProductId={i._id}
                  ImgUrl={
                    i.ImageURL
                      ? i.ImageURL
                      : "https://m.media-amazon.com/images/I/31wacBawB3L._AC_SY200_.jpg"
                  }
                  Name={i.Name}
                  Type={"electronics"}
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
            onClick={() => handleSlider("left", 300, "Products2")}
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
        <Heading>Kitchen Products</Heading>
        <HomeProductsFeatured id="Products3">
          <ArrowBackIosIcon
            onClick={() => handleSlider("right", 300, "Products3")}
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

          {KitchenProducts ? (
            KitchenProducts.map((i) => (
              <>
                <ProductShowcaser
                  ProductId={i._id}
                  ImgUrl={
                    i.ImageURL
                      ? i.ImageURL
                      : "https://m.media-amazon.com/images/I/31wacBawB3L._AC_SY200_.jpg"
                  }
                  Name={i.Name}
                  Type={"Kitchen"}
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
            onClick={() => handleSlider("left", 300, "Products3")}
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
      </Content>
    </Container>
  );
};

export default HomePage;

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  margin: 4em 0;
  @media (max-width: 760px) {
    .MuiSvgIcon-root {
      background-color: transparent !important;
      height: 5% !important;
      color: black !important;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  margin: 1em 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HomeTopSlider = styled.div`
  width: 100%;
  margin: 0 0%;
  display: flex;
  align-items: center;
  overflow: hidden;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
    scroll-behavior: smooth;
  }

  & img {
    margin: 0 1em 0 0;
    @media (max-width: 760px) {
      margin: 0;
    }
  }
`;

const SponseredProductImageSlider = styled(motion.img)`
  width: 95%;
  min-height: 12rem;
  border: 1px solid lightgray;
  height: 80%;
  background-size: cover;
  border-radius: 1em;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
`;

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
