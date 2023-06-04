import styled from "styled-components";
import axios from "axios"
import {useSelector} from "react-redux"
import { useState } from "react";
import {toast} from "react-hot-toast"
import { TableHead } from "@mui/material";
import { useEffect } from "react";
const Orders = ({BackendURL}) => {
  const {UserAuthData} =useSelector((state) => state.Auth)
  const [orders ,setOrders] =useState([])
  const getOrders= async()=> {
 try {
    const getOrder = await axios.get(
      `${BackendURL}/products/getOrders?userId=${UserAuthData.data._id}`
    );
   setOrders(getOrder.data.data)
 } catch (error) {
   toast.error("An error occured")
 }
  }
  useEffect(() => {
    getOrders()
  },[])
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <Container>
      <Content>
        <Heading>Your Orders</Heading>
        {orders.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>OrderId</TableHeader>
                <TableHeader>Delivery Status</TableHeader>
                <TableHeader>Amount</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{formatDate(order.DeliveryDate)}</TableCell>
                  <TableCell>{order.Payment ? `Paid ` : "Unpaid"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <NoOrders>No orders placed yet</NoOrders>
        )}
        <BottomHeading>
          If you have any concerns or face any issues with your orders, please
          contact us at <ContactLink>support@example.com</ContactLink>.
        </BottomHeading>
      </Content>
    </Container>
  );
};

export default Orders;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  color: black;
  border-bottom: 1px solid rgba(0, 0, 0, 0.35);
`;

const TableCell = styled.td`
  padding: 1rem;
  color: black;
  border: 1px solid rgba(0, 0, 0, 0.25);
`;

const NoOrders = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: black;

  @media (min-width: 768px) {
    margin-top: 4rem;
  }
`;


const TableBody = styled.tbody``;

const TableRow = styled.tr``;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const FlexGrid = styled.div`
  margin: 4rem;
  border-radius: 0.5em;
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    margin: 4rem;
  }
`;

const Heading = styled.h1`
  text-align: center;
  color: black;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const List = styled.li`
  color: black;
  list-style: none;
  text-decoration: none;
`;

const BottomHeading = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: black;

  @media (min-width: 768px) {
    margin-top: 4rem;
  }
`;

const ContactLink = styled.a`
  color: blue;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;

const TableHeading = styled.h4`
  color: black;
  border-bottom: 1px solid rgba(0, 0, 0, 0.35);
`;

const FlexGridLeft = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.25);
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const FlexGridMiddle = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.25);
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const FlexGridRight = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.25);
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;
