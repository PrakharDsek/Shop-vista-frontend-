import { useEffect, useState } from "react";
import styled from "styled-components";
import { redirect, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Checkout = ({ BackendURL ,productId}) => {
  const { UserAuthData } = useSelector((state) => state.Auth);
  const [buttonDisable ,setButtonDisable] =useState(true)
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    landmark: "",
    city: "",
    postalCode: "",
  });
  const [orderId, setorderId] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
const [product ,setProduct] =useState([])
  const total = searchParams.get("total");
  const quantity= searchParams.get("quantity")
  const rQuantity= searchParams.get("product")
  

  const getOrderId = async () => {
    try {
      let currentDate = new Date();
      const OrderId = await axios.post(`${BackendURL}/payments/order/create`, {
        amount: total,
        ordererId: UserAuthData.data._id,
        productId:productId,
        deliveryDate: currentDate.setDate(currentDate.getDate() + 230),
      });
      setorderId(OrderId.data.data.id);
    } catch (error) {
      console.error(error);
    }
  };
const getProductsById = async (url) => {
  try {
    const parsedURL = new URL(url);
    const queryParams = new URLSearchParams(parsedURL.search);
    const quantity = queryParams.get("quantity");

    if (quantity) {
      const decodedQuantity = decodeURIComponent(quantity);
      const parsedQuantity = JSON.parse(decodedQuantity);

      const getProductPromises = parsedQuantity.map((productId) =>
        axios.get(`${BackendURL}/products/getById?productId=${productId}`)
      );

      const products = await Promise.all(getProductPromises);
     const CartProductData = products.map(
       (response) => response.data.data
     );
      setProduct(products);
    }
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  const url = window.location.href;
  getProductsById(url);
}, []);


  const handlePayment = () => {
    getOrderId();
    const options = {
      key: "rzp_test_TSHgTgPYdyakHY", // Enter the Key ID generated from the Dashboard
      amount:Number(total*100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Shop VIsta",
      description: "Where every purchase is a pleasure ",
      image: "https://avatars.githubusercontent.com/u/105925167?v=4",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        console.log(response)
        if(product.length !=0) {
          product.map(async(i) => {
            const VerifyPayments = await axios.post(
              `${BackendURL}/payments/verify`,
              {
                razorPayId: response.razorpay_payment_id,
                razorPayOrderId: response.razorpay_order_id,
                razorPaySign: response.razorpay_signature,
                userId: UserAuthData.data._id,
                productId: i.data.data._id,
                sellerId: i.data.data.SellerId,
                quantity: product.length,
                price: total,
              },
              {
                withCredentials: true,
              }
            );
          })
        } 
      }, 
      prefill: {
        name: UserAuthData.data.Name,
        email: UserAuthData.data.Email,
        contact: UserAuthData.data.PhoneNo,
      },
      notes: {
        address: "Shop vista near Olympus Mons,mars",
      },
      theme: {
        color: "#051c27",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function () {
       redirect("/payments/failed")
    });
     rzp1.open();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (e.target.value.length >0 ) {
      setButtonDisable(false)
    }
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
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
  ];

  return (
    <Container>
      <Content>
        <Form>
          <InputContainer>
            <Heading>Shipping Details</Heading>
            <form>
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
            </form>
          </InputContainer>
          <Basket>
            <UserBasket>
              <Heading style={{ textAlign: "center" }}>
                Your Order items
              </Heading>
              {product.length != 0
                ? product.map((i) => (
                    <>
                      <BasketItems>
                        <CartItemsList>{i.data.data.Name}</CartItemsList>
                        <CartPriceList>₹{total}</CartPriceList>
                      </BasketItems>
                    </>
                  ))
                : "No products to preview"}
            </UserBasket>
            <div>
              <Button
                disabled={buttonDisable}
                type="submit"
                onClick={() => handlePayment()}
              >
                Pay now
              </Button>
            </div>
          </Basket>
        </Form>
      </Content>
    </Container>
  );
};

export default Checkout;

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
    width: 100%;
    border: none;
    left: 0;
    margin: 0;
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
const Basket = styled.div`
  width: 40%;
  height: 40%;
  margin: 2rem 0;
  max-height: 20%;
  @media (max-width: 760px) {
    width: 99%;
    left: 0;
    background-color: var(--header_bg);
    position: fixed;
    bottom: 0;
    left: 0;
    height: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    margin: 0;
  }
`;

const UserBasket = styled.div`
  overflow: hidden;
  overflow-y: scroll;
  max-height: 80%;
  width: 80%;
  border-radius: 1em;
  margin: 1em;
  background-color: whitesmoke;
  color: black;
  & ::-webkit-scrollbar {
    color: white; 
  }
`;

const CartItemsList = styled.li`
  padding: 12px;
  list-style: none;
`;
const CartPriceList = styled.li`
  padding: 12px;
  list-style: none;
`;
const BasketItems = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2em;
`;

const InputContainer = styled.div`
  width: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;
