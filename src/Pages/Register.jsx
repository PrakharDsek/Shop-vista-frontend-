import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthSetter } from "../../Redux/Auth";

const Register = ({ BackendURL }) => {
  const [methodReg, setMethodReg] = useState("login");
  const navigate = useNavigate();
  const [LoginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const dispatch=useDispatch()
  const [SignUpDetails, setSignUpDetails] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNo: "",
    Isseller: false,
    subscriber: false,
  });
  const HandleLoginInputs = (type, res) => {
    switch (type) {
      case "email":
        setLoginDetails((prev) => ({
          ...prev,
          email: res,
        }));
        break;
      case "password":
        setLoginDetails((prev) => ({
          ...prev,
          password: res,
        }));
    }
  };
  const HandleSignUpInputs = (type, res) => {
    switch (type) {
      case "email":
        setSignUpDetails((prev) => ({
          ...prev,
          email: res,
        }));
        break;
      case "name":
        setSignUpDetails((prev) => ({
          ...prev,
          name: res,
        }));
        break;
      case "password":
        setSignUpDetails((prev) => ({
          ...prev,
          password: res,
        }));
        break;
      case "address":
        setSignUpDetails((prev) => ({
          ...prev,
          address: res,
        }));
        break;
      case "isSeller":
        setSignUpDetails((prev) => ({
          ...prev,
          Isseller: res,
        }));
        break;
      case "phoneNo":
        setSignUpDetails((prev) => ({
          ...prev,
          phoneNo: res,
        }));
    }
  };

  const LoginArray = [
    {
      type: "email",
      placeholder: "example@mail.com",
      heading: "Email",
      OnChange: "email",
    },
    {
      type: "password",
      placeholder: "password",
      heading: "Password",
      OnChange: "password",
    },
  ];
  const SignUpArray = [
    {
      type: "text",
      placeholder: "Johon Doe",
      heading: "Name",
      onChange: "name",
    },
    {
      type: "email",
      placeholder: "example@mail.com",
      heading: "Email",
      onChange: "email",
    },
    {
      type: "password",
      placeholder: "password",
      heading: "Password",
      onChange: "password",
    },

    {
      type: "phone",
      placeholder: "003-1124-030",
      heading: "Phone Number",
      onChange: "phoneNo",
    },
    {
      type: "text",
      placeholder: "Address",
      heading: "Address",
      onChange: "address",
    },
    {
      type: "checkbox",
      placeholder: "Become Seller",
      heading: "Want Seller account?",
      onChange: "isSeller",
    },
  ];

  const Login = async () => {
    try {
      const LoginUser = await axios.post(
        `${BackendURL}/auth/login`,
        {
          email: LoginDetails.email,
          password: LoginDetails.password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(AuthSetter(LoginUser.data))
      toast.success("Successfully logged in");
      
      
      navigate("/");
    } catch (error) {
      toast.error("An error occured");
    }
  };

  const SignUp = async () => {
    try {
      const MakeAccount = await axios.post(
        `${BackendURL}/auth/new`,
        {
          name: SignUpDetails.name,
          email: SignUpDetails.email,
          password: SignUpDetails.password,
          address: SignUpDetails.address,
          phoneNo: SignUpDetails.phoneNo,
          Isseller: SignUpDetails.Isseller, // Updated property name to "isSeller"
          subscriber: SignUpDetails.subscriber,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(AuthSetter(MakeAccount.data))
      toast.success("Created account succcressfully");
      navigate("/home");
    } catch (error) {
      toast.error("User with same email and password already exists");
    }
  };
  return (
    <Container>
      <Content>
        {methodReg == "login" ? (
          <LoginBox>
            <Heading>Welcome back,Login</Heading>
            {LoginArray.map((i) => (
              <>
                <InputContainer>
                  <InputLabel>{i.heading}</InputLabel>
                  <InputField
                    onChange={(e) =>
                      HandleLoginInputs(i.OnChange, e.target.value)
                    }
                    type={i.type}
                    placeholder={i.placeholder}
                  />
                </InputContainer>
              </>
            ))}
            <Button onClick={Login}>Login</Button>
            <SmallHeading onClick={() => setMethodReg("signUp")}>
              New user? sign up instead
            </SmallHeading>
            <TermAndConditions>
              By accessing and using this website, you accept and agree to be
              bound by the terms and conditions set forth in this agreement. If
              you do not agree to these terms, you should not use the site.
            </TermAndConditions>
          </LoginBox>
        ) : (
          <SignUpBox>
            <Heading>Fill up the Form </Heading>
            {SignUpArray.map((i) => (
              <>
                {i.type !== "checkbox" ? ( // Check if input type is not checkbox
                  <InputContainer>
                    <InputLabel>{i.heading}</InputLabel>
                    <InputField
                      type={i.type}
                      onChange={(e) =>
                        HandleSignUpInputs(i.onChange, e.target.value)
                      }
                      placeholder={i.placeholder}
                    />
                  </InputContainer>
                ) : (
                  <InputContainer>
                    <InputLabel>{i.heading}</InputLabel>
                    <InputField
                      type="checkbox"
                      onChange={() =>
                        HandleSignUpInputs(i.onChange, !SignUpDetails.isSeller)
                      }
                    />
                  </InputContainer>
                )}
              </>
            ))}
            <Button onClick={SignUp}>Create account</Button>
            <SmallHeading onClick={() => setMethodReg("login")}>
              Already user?Login instead{" "}
            </SmallHeading>
            <TermAndConditions>
              By accessing and using this website, you accept and agree to be
              bound by the terms and conditions set forth in this agreement. If
              you do not agree to these terms, you should not use the site.
            </TermAndConditions>
          </SignUpBox>
        )}
      </Content>
    </Container>
  );
};

export default Register;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
const LoginBox = styled.div`
  height: 70%;
  width: 30%;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  margin: 2px;
  padding: 1.6rem;
  display: flex;
  margin: 3em;
  flex-direction: column;
  @media (max-width: 760px) {
    width: 100%;
  }
`;
const SignUpBox = styled.div`
  height: 100%;
  width: 50%;
  margin: 2em;
  border-radius: 6px;
  margin: 2px;
  padding: 1.6rem;
  display: flex;

  flex-direction: column;
  @media (max-width: 760px) {
    width: 100%;
  }
`;
const Heading = styled.h1`
  text-align: center;
  font-weight: 500;
  margin: 3px;
  color: black;
`;
const InputField = styled.input`
  width: 100%;
  height: 20%;
  padding: 10px;
  margin: 2px;
  outline: none;

  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;
const Button = styled.button`
  padding: 12px;
  margin: 2em;
  background-color: var(--header_bg);
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  width: 80%;
  cursor: pointer;
`;
const TermAndConditions = styled.p`
  color: black;
  font-size: 0.7em;
  font-weight: 400;
  width: 100%;
  height: 20%;
`;
const InputLabel = styled.h3`
  color: black;
  font-weight: 300;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SmallHeading = styled.h6`
  color: black;
  padding: 2px;
  margin: 2px;
  font-weight: 400;
  text-decoration: underline;
  text-align: center;
  cursor: pointer;
`;
