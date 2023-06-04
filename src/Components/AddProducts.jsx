import { useState } from "react";
import styled from "styled-components"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../Firebase/Db";
import { toast } from "react-hot-toast";
import axios from "axios";
import Spinner from "../assets/Spinner.gif"
const AddProducts = ({ BackendURL, userId, name }) => {
 const [imagePath, setImagePath] = useState("");
 const [videoPath, setVideoPath] = useState("");
 const [loading ,setLoading] =useState(false)
 const [imagePathURL, setImagePathURL] = useState("");
 const [videoPathURL, setVideoPathURL] = useState("");
 const [formValues, setFormValues] = useState({
   sellerName:name,
   name:"",
   title:"",
   description:"",
   briefDescription:"",
   imageURL:[imagePathURL],
   videoURL:videoPathURL,
   comments:[""],
   price:"",
   stars:2,
   discount:"",
   trusted:true,
   offers:[""],
   category:"",
   stock:0,
   sellerId:userId,
   sold:0,
   specifications:[""],
 });

  const InputArra = [
    {
      type: "text",
      placeholder: "Name Of the product",
      heading: "Product Name",
      name: "name",
    },
    {
      type: "text",
      placeholder: "Title",
      heading: "Title for the product",
      name: "title",
    },
    {
      type: "text",
      placeholder: "Description ",
      heading: "Description for the product",
      name: "description",
    },
    {
      type: "text",
      placeholder: "Brief description ",
      heading: "Brief description for the product",
      name: "briefDescription",
    },
    {
      type: "text",
      placeholder: "Category ",
      heading: "Category for the product",
      name: "category ",
    },
    {
      type: "text",
      placeholder: "Specifications ",
      heading: "Specification for the product",
      name: "specification ",
    },
    {
      type: "text",
      placeholder: "offers ",
      heading: "offers for the product",
      name: "offers",
    },

    {
      type: "number",
      placeholder: "Price ",
      heading: "Price for the product",
      name: "price",
    },
    {
      type: "number",
      placeholder: "Discount ",
      heading: "Discount for the product",
      name: "discount",
    },
    {
      type: "number",
      placeholder: "Stock ",
      heading: "Stock for the product",
      name: "stock",
    },
    {
      type: "file",
      placeholder: "IMAGES ",
      name: "imageURL",
      heading: "Images of the product",
      onselect: "handleFile",
    },
    {
      type: "file",
      placeholder: "Video ",
      heading: "Video of the product",
      name: "videoURL",
      onselect: "handleFile",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setImagePath(file);
      } else if (file.type.startsWith("video/")) {
        setVideoPath(file);
      }
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      let updatedFormValues = { ...formValues }; // Create a copy of formValues

      // Upload image file if it exists
      if (imagePath instanceof File) {
        const imageRef = ref(storage, `posts/${imagePath.name}`);
        const imageSnapshot = await uploadBytes(imageRef, imagePath);
        const imageUrl = await getDownloadURL(imageSnapshot.ref);
        setImagePathURL(imageUrl);
        updatedFormValues.imageURL = [imageUrl]; // Update the imageURL property
      }

      // Upload video file if it exists
      if (videoPath instanceof File) {
        const videoRef = ref(storage, `posts/${videoPath.name}`);
        const videoSnapshot = await uploadBytes(videoRef, videoPath);
        const videoUrl = await getDownloadURL(videoSnapshot.ref);
        setVideoPathURL(videoUrl);
        updatedFormValues.videoURL = videoUrl; // Update the videoURL property
      }

      // Send the form data to your backend
      const response = await axios.post(
        `${BackendURL}/products/new`,
        {
          sellerName: name,
          name: updatedFormValues.name,
          title: updatedFormValues.title,
          description: updatedFormValues.description,
          briefDescription: updatedFormValues.briefDescription,
          imageURL: updatedFormValues.imageURL,
          videoURL:updatedFormValues.videoURL,
          comments: [""],
          price: updatedFormValues.price,
          stars: 2,
          discount: updatedFormValues.discount,
          trusted: true,
          offers: updatedFormValues.offers,
          category: updatedFormValues.category,
          stock: updatedFormValues.stock,
          sellerId: userId,
          sold: 0,
          specifications:updatedFormValues.specifications
        },
        {
          withCredentials: true,
        }
      );

      // Handle the response as needed
      console.log(response.data);
      setLoading(false)
      toast.success("Success! Your product is now posted.");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to post the product.");
    }
  };

  return (
    <Container>
      <Content>
        {loading ?<>
            <img src={Spinner} alt="" />
            <Heading>Uploading your product</Heading>
            </>
            :

        
<>
        {InputArra.map((i) => (
            <>
            <InputLabel>{i.heading}</InputLabel>
            <InputField
              type={i.type}
              onChange={handleInputChange}
              onSelect={i.onselect}
              placeholder={i.placeholder}
              name={i.name}
              multiple={true}
              required
            />
          </>
          ))}
        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Post Product
        </Button>
  </>  }
      </Content>
    </Container>
  );
};

export default AddProducts

const Container=styled.div`
    width:100%;
    height:100%;
`
const Content=styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Heading=styled.h1`
    color:black;
    font-weight: 400;
`
const InputLabel=styled.p`
    color:black;
    text-align: start;
`
const InputField=styled.input`
    padding:12px;
    margin:6px;
    border:1px solid rgba(0,0,0,0.25);
    border-radius:5px;
    outline: none;
    width:50%;
`
const Button=styled.button`
    background-color: var(--header_bg);
    padding:12px;
    margin:4px;
    color:white;
    border:1px solid rgba(0,0,0,0.25);
    border-radius: 4px;
    cursor: pointer;
`