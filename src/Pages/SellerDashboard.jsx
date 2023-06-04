import { useState } from "react";
import styled from "styled-components";
import AllProducts from "../Components/AllProducts";
import AddProducts from "../Components/AddProducts";
import UpdateProducts from "../Components/UpdateProducts";
import DeleteProducts from "../Components/DeleteProducts";
import axios from "axios"
import {useSelector} from "react-redux"
import { useEffect } from "react";

const SellerDashboard = ({BackendURL}) => {
  const [Mycomponents, setComponents] = useState("home");
  const {UserAuthData} =useSelector((state) => state.Auth)
  const [soldProduct ,setSoldProduct] =useState([])
  const [totalProducts ,setTotalProducts] =useState(0)
  const getTotalProducts=async () => {
    const { data } = await axios.get(
      `${BackendURL}/products/getByUserId?userId=${UserAuthData.data._id}`,
      {
        withCredentials: true,
      }
    );
    console.log(data)
      setTotalProducts(data)
  }

    const DashboardMenuArray = [
    {
      title: "All Products",
      onclick: "AllProduct",
    },
    {
      title: "Add Products",
      onclick: "AddProduct",
    },
    {
      title: "Update Products",
      onclick: "UpdateProduct",
    },
    {
      title: "Delete Products",
      onclick: "DeleteProduct",
    },

  ];
const getSoldproducts=async () => {
  try {
    const {data} =await axios.get(`${BackendURL}/products/getOrders`,{
      userId:UserAuthData.data._id,
    })
    setSoldProduct(data.data)
  } catch (error) {
  console.error(error.message)    
  }
}

useEffect(() => {
  getSoldproducts()
  getTotalProducts()
},[])
const paidItemsCount = soldProduct.filter(
  (item) => item.Payment === true
).length;

  const renderComponent = () => {
    // Logic to render the component based on the selected value
    switch (Mycomponents) {
      case "AllProduct":
        return <AllProducts BackendURL={BackendURL} userId={UserAuthData.data._id}/>;
      case "AddProduct":
        console.log("Add");
        return <AddProducts BackendURL={BackendURL} userId={UserAuthData.data._id}  name={UserAuthData.data.Name}/>;
      case "UpdateProduct":
        return (
          <UpdateProducts
            BackendURL={BackendURL}
            userId={UserAuthData.data._id}
          />
        );
      case "DeleteProduct":
        return <DeleteProducts BackendURL={BackendURL} userId={UserAuthData.data._id}/>;
      default:
        return (
          <>
            <Heading>Seller's Dashboard</Heading>
            <DeterminatorContainer>
              <DeterminatorContent>
                <ValueDeterminator>{soldProduct.length }</ValueDeterminator>
                <Determinator>Sold Products</Determinator>
              </DeterminatorContent>
              <DeterminatorContent>
                <ValueDeterminator>
                 {paidItemsCount}
                </ValueDeterminator>

                <Determinator>
                  Payment recived to shop vista product{" "}
                </Determinator>
              </DeterminatorContent>
              <DeterminatorContent>
                <ValueDeterminator>{totalProducts ? totalProducts.data.length : 0}</ValueDeterminator>
                <Determinator>Total available Products</Determinator>
              </DeterminatorContent>
            </DeterminatorContainer>
          </>
        );
    }
  };
  

  return (
    <Container>
      <Content>
        <Dashboard>
          <DashBoardMenu>
            {DashboardMenuArray.map((i) => (
              <>
                <DashboardMenuLinks
                  onClick={() => setComponents(`${i.onclick}`)}
                >
                  {i.title}
                </DashboardMenuLinks>
              </>
            ))}
          </DashBoardMenu>
          <DashBoardContent>{renderComponent()}</DashBoardContent>
        </Dashboard>
      </Content>
    </Container>
  );
};

export default SellerDashboard;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
`;
const Dashboard = styled.div`
  display: flex;
`;
const DashBoardMenu = styled.div`
  flex: 2;
  border-right: 1px solid rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  background-color: var(--header_bg);
  margin: 2em 0 0 0;

`;
const DashBoardContent = styled.div`
  flex: 14;

  margin: 2em 0 0 0;
`;
const Heading = styled.h1`
  color: black;
  text-align: center;
`;
const ValueDeterminator = styled.h4`
  color: black;
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 2px;
`;
const Determinator = styled.p`
  color: black;
  font-weight: 700;
`;
const DeterminatorContainer = styled.div`
  width: 80%;
  height: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 4rem;
`;
const DashboardMenuLinks = styled.p`
  color: white;
  padding: 8px;
  cursor: pointer;
`;
const DeterminatorContent = styled.div`
  text-align: center;
`;
