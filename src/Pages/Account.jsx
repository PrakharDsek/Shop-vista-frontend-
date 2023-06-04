import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import axios from "axios"
import { useSelector } from "react-redux";
import {toast} from "react-hot-toast"
import {useNavigate} from "react-router-dom"
const Account = ({BackendURL}) => {
  const {UserAuthData}=useSelector((state) => state.Auth)
  const navigate =useNavigate()

  const [inputStats ,setInputStats] =useState(true)
  const InputArray = [
    {
      type: "text",
      placeholder: UserAuthData.data.Name,
      onchange: "Name",
      title: "User Name",
    },
    {
      type: "password",
      placeholder: UserAuthData.data.Password,
      onchange: "Password",
      title: "password",
    },
    {
      type: "text",
      placeholder:UserAuthData.data.Address,
      onchange: "Address",
      title: "Address",
    },
    {
      type: "number",
      placeholder: UserAuthData.data.PhoneNo,
      onchange: "PhoneNo",
      title: "User Phone Number",
    },
  ];
const handleChange = async (Change, newValue) => {
  const payload = {
    userId: UserAuthData.data._id,
    response: newValue, // Assuming `newValue` corresponds to the response value
  };

  payload[Change] = newValue; // Add the dynamic key-value pair
  try {
   const updateCredits = await axios.put(`${BackendURL}/auth/update`, payload);
   toast.success(`updated ${Change}`)
  }catch (error) {
    toast.error("An error occured")
  }
};

const handleLogout=async () => {
  try {
    const logout = await axios.get(`${BackendURL}/auth/logout`, {
      withCredentials: true,
    });
    navigate("/login")
  } catch (error) {
    toast.error("An error occured")
  }
}

  const handleInputStats=() => {
    setInputStats(false)
    console.log(inputStats)

  }
  return (
    <Container>
      <Content>
        <Heading>Account</Heading>
        {InputArray.map((i) => (
          <>
            <InputLabel>{i.title}</InputLabel>
            <div>
              <InputField
                type={i.type}
                placeholder={i.placeholder}
                onChange={(e) => handleChange(i.onchange, e.target.value)}
                disabled={inputStats}
              />
              <EditIcon onClick={handleInputStats} style={{color:"black"}}/>
            </div>
          </>
        ))}
        <div style={{display:"flex"}}>
        <Button onClick={handleLogout}>Logout</Button>
        <Button>Delete Account</Button>

        </div>
      </Content>
    </Container>
  );
};

export default Account;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  margin: 2em 12em;
  @media (max-width:760px) {
    margin:2em ;
  }
`;
const Heading = styled.h1`
  color: black;
  text-align: flex-start;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
`;
const InputField = styled.input`
  width: 50%;
  padding: 12px;
  border: none;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 0.6em;
  background: #ffff;
  color: black;
`;
const Button = styled.button`
  width:20%;
  margin:1rem;
  padding:12px;
  border:1px solid rgba(0,0,0,0.25);
  border-radius: 0.4em;
  background-color: #b03434;
  cursor: pointer;
  @media (max-width:760px) {
    width: 30%;
    margin: 1em .5rem;
    padding:6px;
  }
`;
const InputLabel = styled.p`
  color: black;
  text-align: flex-start;
`;
