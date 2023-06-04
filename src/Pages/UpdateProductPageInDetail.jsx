import styled from "styled-components";
import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { storage } from "../Firebase/Db";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { useSelector } from "react-redux";
const UpdateProductPageInDetail = ({ BackendURL }) => {
  const [Products, setProducts] = useState();
  const { ProductId } = useParams();
 const [imagePathURL, setImagePathURL] = useState("");

  const [isdisabled, setDisabled] = useState(true);
  const [SignUpDetails, setSignUpDetails] = useState({
    name: Products ? Products.Name : "",
    description: Products ? Products.Description : "",
    briefDescription: Products ? Products.BriefDescription : "",
    price: Products ? Products.Price : "",
    discount: Products ? Products.Discount : "",
    offers: Products ? Products.Offers : "",
    stars: Products ? Products.Stars : "",
    stock: Products ? Products.Stock : "",
  });
 const [imagePath, setImagePath] = useState("");
  const { UserAuthData } = useSelector((state) => state.Auth);
  const [myComment, setmyComment] = useState({
    comment: "",
    productId: ProductId,
    commenterId: UserAuthData.data,
  });
  const [currentImage, setCurrentImage] = useState(
    Products && Products.ImageURL && Products.ImageURL.length > 0
      ? Products.ImageURL[0]
      : "https://m.media-amazon.com/images/I/61eXvcm9zrL._SX522_.jpg"
  );
  const handleImages = (e) => {
    setCurrentImage(e.target.src);
  };
  const FetchData = async () => {
    const Product = await axios.get(
      `${BackendURL}/products/getById?productId=${ProductId}`
    );
    setProducts(Product.data.data);
  };

  const handleInputs = () => {
    setDisabled(false);
  };
  const updateProduct = async (updateKey, updateValue) => {
 
       const imageRef = ref(storage, `posts/${imagePath.name}`);
       const imageSnapshot = await uploadBytes(imageRef, imagePath);
       const imageUrl = await getDownloadURL(imageSnapshot.ref);
       setImagePathURL(imageUrl);
      SignUpDetails.imageURL = [imageUrl]; // Update the imageURL property

    
    const productUpdate = await axios.put(
      `${BackendURL}/products/update`,
      {
        productId: Products._id,
        [updateKey]: updateValue,
      },
      {
        withCredentials: true,
      }
    );
    console.log(productUpdate);
  };
  const HandleSignUpInputs = (type, res) => {

    switch (type) {
      case "name":
        updateProduct("name", res);
        break;
      case "imageURL":
        setImagePath(res);
        break;
      case "description":
        updateProduct("description", res);
        break;
      case "briefDescription":
        updateProduct("briefDescription", res);

        break;
      case "price":
        updateProduct("price", res);

        break;
      case "discount":
        updateProduct("discount", res);

        break;
      case "offers":
        updateProduct("offers", res);

        break;
      case "stars":
        updateProduct("stars", res);

        break;
      case "specifications":
        updateProduct("specifications", res);

        break;
      case "stock":
        updateProduct("stock", res);
    }
  };
  useEffect(() => {
    FetchData();
  }, []);

  return (
    <Container>
      <Content>
        <ProductContainer>
          <ImageDisplayer>
            <OtherSmallImagesContainer>
              {Products && Products.ImageURL.length > 0 ? (
                Products.ImageURL.map((i) => (
                  <>
                    <OtherSmallImages onClick={handleImages} src={i} />
                  </>
                ))
              ) : (
                <>
                  <OtherSmallImages
                    onClick={handleImages}
                    src="https://m.media-amazon.com/images/I/61eXvcm9zrL._SX522_.jpg"
                  />
                </>
              )}
            </OtherSmallImagesContainer>
            <ImagesContainer>
              <label htmlFor="file-upload">
                <h5 style={{ color: "black" }}>choose a photo to update </h5>
              </label>
              onChange={(e) => HandleSignUpInputs("image", e.target.value)}
              <input id="file-upload" type="file" />
              <ProductImage
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={currentImage}
              />
            </ImagesContainer>
          </ImageDisplayer>
          <ProductDescription>
            <div onClick={handleInputs}>
              <HeadingInput
                placeholder={Products ? Products.Name : ""}
                disabled={isdisabled}
                onChange={(e) => HandleSignUpInputs("name", e.target.value)}
              />
            </div>
            <ProductLongDesc
              onClick={handleInputs}
              disabled={isdisabled}
              onChange={(e) => HandleSignUpInputs("briefDesc", e.target.value)}
              placeholder={Products ? Products.BriefDesc : " "}
            />
            <div style={{ display: "flex" }}>
              <p style={{ color: "black" }}>$</p>{" "}
              <PriceDisplayer
                onClick={handleInputs}
                disabled={isdisabled}
                onChange={(e) => HandleSignUpInputs("price", e.target.value)}
                placeholder={Products ? Products.Price : ""}
              />
              <>
                {" "}
                {Products && typeof Products.Stars === "number" ? (
                  <StarsTray>{"⭐".repeat(Products.Stars)}</StarsTray>
                ) : null}
              </>
            </div>
            <ProductOffers
              onClick={handleInputs}
              onChange={(e) => HandleSignUpInputs("offers", e.target.value)}
              disabled={isdisabled}
              placeholder={
                Products && Products.Offers.length > 0
                  ? Products.Offers.join(", ")
                  : "No Offers available"
              }
            />
            <ProductsSpecifications
              onClick={handleInputs}
              disabled={isdisabled}
              onChange={(e) =>
                HandleSignUpInputs("specifications", e.target.value)
              }
              placeholder={
                Products &&
                Products.Specifications.some((spec) => spec.trim().length > 0)
                  ? Products.Specifications.filter(
                      (spec) => spec.trim().length > 0
                    ).join(", ")
                  : "No specification about the product was shared"
              }
            />

            <Button onClick={updateProduct}>Update the product</Button>
          </ProductDescription>
        </ProductContainer>
        <CommentsSection>
          <Heading style={{ textAlign: "center" }}>Feedbacks by users</Heading>

          {Products && Products.Comments.length > 0 ? (
            Products.Comments.map((i) => (
              <>
                <CommentContainer>
                  <CommentUserDetail>
                    <CommentAvatar src="https://m.media-amazon.com/images/I/61eXvcm9zrL._SX522_.jpg" />
                    <CommenterName>{i.Commenter}</CommenterName>
                  </CommentUserDetail>
                  <Comment>{i.Comment}</Comment>
                  <StarsTray>
                    {i.Rating ? "⭐".repeat(i.Rating) : "⭐⭐⭐⭐⭐"}
                  </StarsTray>
                </CommentContainer>
              </>
            ))
          ) : (
            <>
              <CommenterName>Currently no feedbacks availabe</CommenterName>
            </>
          )}
        </CommentsSection>
      </Content>
    </Container>
  );
};

export default UpdateProductPageInDetail;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ProductContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 12px;
  margin: 4rem 0;
  @media (max-width: 760px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
`;
const HeadingInput = styled.input`
  color: black;
  font-size: 2rem;
  font-weight: 600;
  border: none;
  padding: 0.8em;
  margin: 4px;
  width: 80%;
  ::placeholder {
    color: black;
  }
`;
const Heading = styled.h1`
  color: black;
`;
const ImageDisplayer = styled.div`
  display: flex;
  width: 40%;

  border-radius: 4px;
  padding: 12px;
  margin: 4px;
`;
const ProductDescription = styled.div`
  width: 60%;
`;
const CommentsSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  padding: 4em;

  @media (max-width: 760px) {
    padding: 1em;
  }
`;
const PriceDisplayer = styled.input`
  & p {
    color: black;
    line-height: 2px;
    margin: 0.2rem;
    padding: 1px;
    font-size: 1.6em;
    border: none;
    padding: 0.8em;
    width: 80%;
    ::placeholder {
      color: black;
    }
  }
  color: black;
  line-height: 2px;
  margin: 0.2rem;
  padding: 1px;
  font-size: 1.6em;
  border: none;
  padding: 0.8em;
  width: 80%;
  ::placeholder {
    color: black;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
`;
const ProductsSpecifications = styled.input`
  color: black;
  font-size: 1.2em;
  font-weight: 400;
  border: none;
  padding: 0.8em;
  width: 80%;
  margin: 4px;

  ::placeholder {
    color: black;
  }
`;
const ProductOffers = styled.input`
  color: black;
  font-size: 0.8em;
  margin: 3em;
  display: flex;
  flex-direction: column;
  border: none;
  padding: 0.8em;
  width: 80%;
  ::placeholder {
    color: black;
  }
`;
const ProductImage = styled(motion.img)`
  min-height: 100%;
  min-width: 100%;
  width: 20px;
  border-radius: 12px;
  object-fit: contain;
`;
const Button = styled.button`
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  color: #fff;
  background-color: var(--header_bg);
  width: 50%;
  margin: 0 4rem;
  @media (max-width: 760px) {
    margin: 0;
  }
`;
const OtherSmallImages = styled.img`
  width: 100%;
  min-height: 20%;
  border: 1px solid rgba(0, 0, 0, 0, 25);
  border-radius: 6px;
  max-height: 10%;
  cursor: pointer;
`;
const OtherSmallImagesContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ImagesContainer = styled.div`
  width: 80%;
`;
const ProductLongDesc = styled.input`
  color: black;
  font-size: 1.1em;
  font-weight: 500;
  color: black;
  border: none;
  padding: 0.8em;
  width: 80%;
  ::placeholder {
    color: black;
  }
`;

const StarsTray = styled.div`
  width: 90%;
  padding: 12px;
`;

const CommentAvatar = styled.img`
  width: 4%;
  height: 2%;
  border-radius: 400px;
  border: 1px solid rgba(0, 0, 0, 0.25);
`;
const Comment = styled.p`
  color: black;
`;
const CommenterName = styled.h3`
  color: black;
`;
const CommentContainer = styled.div`
  width: 40%;
  height: 30%;
  display: flex;
  flex-direction: column;
  margin: 0 4rem 0 0;

  border-radius: 0.5em;
  text-align: start;
  padding: 4px;
  @media (max-width: 760px) {
    width: 100%;
  }
`;
const CommentUserDetail = styled.div`
  display: flex;
  align-items: center;
`;

const InputField = styled.input`
  padding: 8px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  background-color: transparent;
  color: black;
  width: 100%;
`;
