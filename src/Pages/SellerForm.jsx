import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {toast} from "react-hot-toast"
import {useNavigate} from "react-router-dom"
const SellerForm = ({ BackendURL }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    landmark: "",
    city: "",
    postalCode: "",
    officeAdd: "",
    typeOfSeller: "",
  });
  const navigate=useNavigate()
  const InputsReq = [
    {
      type: "text",
      placeholder: "John Doe",
      name: "name",
      Heading: "Full Name",
    },
    {
      type: "email",
      placeholder: "JohnDoe@mail.com",
      name: "email",
      Heading: "Email",
    },
    {
      type: "tel",
      placeholder: "00-00-111-00",
      name: "phoneNumber",
      Heading: "Phone Number",
    },
    {
      type: "text",
      placeholder: "Ew-2 local road",
      name: "address",
      Heading: "House number and street name",
    },
    {
      type: "text",
      placeholder: "Near..",
      name: "landmark",
      Heading: "Landmark",
    },
    {
      type: "text",
      placeholder: "New Delhi",
      name: "city",
      Heading: "City",
    },
    {
      type: "number",
      placeholder: "482001",
      name: "postalCode",
      Heading: "Postal Code",
    },
    {
      type: "text",
      placeholder: "near something west delhi name.pvt",
      name: "Office address",
      Heading: "Office Address",
    },
    {
      type: "text",
      placeholder: "Big ,small ,shopkeeper",
      name: "typeof",
      Heading: "which among the seller you are ",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const Register = async () => {
    try {
      const registerUser = await axios.post(`${BackendURL}/auth/seller/new`, {
        formValues,
      });
      navigate("/")
    toast.success("Registered as a seller")      
    } catch (error) {
      toast.error("Error while registering with the details")
    }
  };

  return (
    <Container>
      <Content>
        <Form>
          <InputContainer>
            <Heading>Detail about you</Heading>
            {InputsReq.map((input) => (
              <Inputs key={input.name}>
                <HeadingInputs>{input.Heading}</HeadingInputs>
                <InputField
                  type={input.type}
                  placeholder={input.placeholder}
                  name={input.name}
                  value={formValues[input.name]}
                  onChange={handleInputChange}
                />
              </Inputs>
            ))}
          </InputContainer>
        </Form>
        <Button onClick={Register}>Become a seller</Button>
      </Content>
    </Container>
  );
};

export default SellerForm;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  margin: 0 8rem;
  width: 100%;

  @media (max-width: 760px) {
    width: 100%;
    height: 100%;
    padding: 1em;
    margin: 0 2rem;
    & .cartItems {
      position: fixed;
    }
  }
`;
const Form = styled.div`
  width: 100%;
  display: flex;
  @media (max-width: 760px) {
    justify-content: center;
    flex-direction: column;
  }
`;
const InputField = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.25);
  width: 90%;
  padding: 12px;
  border-radius: 0.5rem;
  outline: none;

  @media (max-width: 760px) {
    padding: 12px;
    border-radius: 0.5rem;
    width: 100%;
  }
`;
const Button = styled.button`
  padding: 12px;
  margin: 2em 0;
  border-radius: 0.5em;
  background-color: var(--header_bg);
  cursor: pointer;
  align-self: center;
  border: 1px solid white;
  width: 85%;
  @media (max-width: 760px) {
    width: 50%;
    border: none;
    left: 0;
    margin: 0;
    margin: 2em;
    height: 10%;
    border-radius: 0;
  }
`;
const Heading = styled.h1`
  color: black;
  text-align: center;
  @media (max-width: 760px) {
    text-align: start;
  }
`;
const Inputs = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeadingInputs = styled.h5`
  color: black;
`;
const InputContainer = styled.div`
  width: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;
