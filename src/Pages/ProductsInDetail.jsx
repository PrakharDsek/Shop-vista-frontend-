import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ProductsInDetail = ({ BackendURL }) => {
  const [Products, setProducts] = useState();
  const { ProductId } = useParams();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const { UserAuthData } = useSelector((state) => state.Auth);
  const [myComment, setmyComment] = useState({
    comment: "",
    productId: ProductId,
    commenterId: UserAuthData.data.Name,
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
  const AddComment = async () => {
    const CommentAdd = await axios.put(`${BackendURL}/product/addComment`, {
      comment: myComment.comment,
      productId: myComment.productId,
      commenterId: myComment.commenterId,
      rating: rating,
    });
    FetchData();
    toast.success("Thank 's for feedback", {
      style: {
        border: "1px solid lightgray",
        padding: "16px",
        color: "green",
        position:"fixed",
        top:"20%",
      },
      iconTheme: {
        primary: "#713200",
        secondary: "#FFFAEE",
      },
    });
  };
  const handleComments = (res) => {
    console.log(myComment);
    const { name, value } = res.target;
    switch (name) {
      case "comment":
        setmyComment((prevState) => ({
          ...prevState,
          comment: value,
        }));
        break;
      case "rating":
        setmyComment((prevState) => ({
          ...prevState,
          rating: value,
        }));
        break;
      default:
        break;
    }
  };
  const AddToCart = async () => {
   try {
     const CartProduct = await axios.put(`${BackendURL}/cart/add`, {
       productId: ProductId,
       userId: UserAuthData.data._id,
     });
     toast.success("SuccessFully Added to cart");
   } catch (error) {
    toast.error("An error occured")
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
              <ProductImage
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={currentImage}
              />
            </ImagesContainer>
          </ImageDisplayer>
          <ProductDescription>
            <Heading>{Products ? Products.Name : " "}</Heading>
            <ProductLongDesc>
              {Products ? Products.BriefDesc : " "}
            </ProductLongDesc>
            <PriceDisplayer>
              <p>${Products ? Products.Price : ""}</p>
              {Products && typeof Products.Stars === "number" ? (
                <StarsTray>{"⭐".repeat(Products.Stars)}</StarsTray>
              ) : null}
            </PriceDisplayer>
            <ProductOffers>
              {Products && Products.Offers.length < 0 ? (
                Products.Offers.map((i) => (
                  <>
                    <li>{i}</li>
                  </>
                ))
              ) : (
                <>
                  <li>No Offers available</li>
                </>
              )}
            </ProductOffers>
            <ProductsSpecifications>
              {Products && Products.Specifications.length < 0 ? (
                Products.Specifications.map((i) => (
                  <>
                    <li>{i}</li>
                  </>
                ))
              ) : (
                <>
                  <li>No specification about the product was shared</li>
                </>
              )}
            </ProductsSpecifications>
            <Button onClick={AddToCart}>Add to Cart</Button>
          </ProductDescription>
        </ProductContainer>
        <CommentsSection>
          <div style={{ display: "flex", width: "100%" }}>
            <InputField
              name="comment"
              onChange={handleComments}
              placeholder="Add a feedback"
            />
            <SendIcon style={{ color: "black" }} onClick={AddComment} />
          </div>
          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  name="rating"
                  className={index <= (hover || rating) ? "on" : "off"}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <span className="star">&#9733;</span>
                </button>
              );
            })}
          </div>
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

export default ProductsInDetail;

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
const PriceDisplayer = styled.div`
  & p {
    color: black;
    line-height: 2px;
    margin: 0.2rem;
    padding: 1px;
    font-size: 1.6em;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
`;
const ProductsSpecifications = styled.h5`
  color: black;
  font-size: 1.2em;
  font-weight: 400;
`;
const ProductOffers = styled.p`
  color: black;
  font-size: 0.8em;
  margin: 3em;
  display: flex;
  flex-direction: column;
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
const ProductLongDesc = styled.p`
  color: black;
  font-size: 1.1em;
  font-weight: 500;
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
