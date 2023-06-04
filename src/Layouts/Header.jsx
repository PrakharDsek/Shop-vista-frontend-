import MoreVertIcon from '@mui/icons-material/MoreVert';
import styled from "styled-components";
import { SearchOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
const Header = () => {
  const [NavbarMenu, setNavbarMenu] = useState(false);
  const NavigateTo = useNavigate();
  const [showMoreOptions ,setShowMoreOptions] =useState(false);
  const [Query ,setQuery]=useState(" ")
  const handleKeyPress = (event) => {
    setQuery(event.target.value)
    if (event.key === "Enter") {
      NavigateTo(`/search?query=${event.target.value}`);
    }
  };
    const { UserAuthData } = useSelector((state) => state.Auth);
  return (
    <Container>
      <Content>
        <HeaderNavigation>
          <Logo>
            <Link style={{ color: "#fff", textDecoration: "none" }} to="/">
              <h2> Shop Vista</h2>
            </Link>
          </Logo>

          <MuiIcons>
            <SearchBar
              onKeyPress={handleKeyPress}
              placeholder="Search for products"
            />
            <SearchOutlined
              onClick={() => NavigateTo(`/search?query=${Query}`)}
            />
          </MuiIcons>
          <List>
            <Link style={{ color: "#fff", textDecoration: "none" }} to="/home">
              <p>Home</p>
            </Link>
          </List>
          <List>
            <Link
              style={{ color: "#fff", textDecoration: "none" }}
              to="/products"
            >
              <p>Products</p>
            </Link>
          </List>
          <List>
            <Link style={{ color: "#fff", textDecoration: "none" }} to="/cart">
              <p>Cart</p>
            </Link>
          </List>

          <List>
            <Link
              style={{ color: "#fff", textDecoration: "none" }}
              to="/accounts"
            >
              <p>Account</p>
            </Link>
          </List>

          <Link style={{ color: "#fff", textDecoration: "none" }} to="/me">
            <Avatar className="Avatar" />
          </Link>
          <Link>
            <List>
              <MoreVertIcon
                onClick={() => setShowMoreOptions(!showMoreOptions)}
              />
            </List>
          </Link>
          {showMoreOptions ? (
            <>
              <OptionContainer
                initial={{ right: "-222px" }}
                animate={{ right: 0 }}
                onEnded={{ right: 0 }}
              >
                <CloseIcon
                  style={{
                    zIndex: "99999",
                    position: "absolute",
                    top: "0px",
                    right: 0,
                  }}
                  onClick={() => setShowMoreOptions(!setShowMoreOptions)}
                />
                {UserAuthData.data.IsSeller == true ? (
                  <>
                    {" "}
                    <List>
                      <Link
                        style={{ color: "#fff", textDecoration: "none" }}
                        to="/SellerDashboard"
                        onClick={() => setShowMoreOptions(!setShowMoreOptions)}
                      >
                        <p>Seller Dashboard</p>
                      </Link>
                    </List>
                  </>
                ) : (
                  ""
                )}

                <Link
                  style={{ color: "#fff", textDecoration: "none" }}
                  to="/subscription"
                  onClick={() => setShowMoreOptions(!setShowMoreOptions)}
                >
                  <p>Purchse Subscription</p>
                </Link>

                <List>
                  <Link
                    style={{ color: "#fff", textDecoration: "none" }}
                    to="/orders"
                    onClick={() => setShowMoreOptions(!setShowMoreOptions)}
                  >
                    <p>Orders</p>
                  </Link>
                </List>
                <List>
                  {UserAuthData.data.IsSeller == false ? (
                    <>
                      <Link
                        style={{ color: "#fff", textDecoration: "none" }}
                        to="/sellerForm"
                        onClick={() => setShowMoreOptions(!setShowMoreOptions)}
                      >
                        <p>Become seller</p>
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                </List>
              </OptionContainer>
            </>
          ) : (
            ""
          )}
          <HeaderNavigationMobile>
            {!NavbarMenu ? (
              <MenuIcon
                className="Hamburgur"
                onClick={() => setNavbarMenu(!NavbarMenu)}
              />
            ) : (
              ""
            )}
            {NavbarMenu ? (
              <>
                <HeaderNavContainer
                  initial={{ left: "-225px" }}
                  animate={{ left: 0 }}
                  onEnded={{ top: "-225px" }}
                >
                  <CloseIcon
                    onClick={() => setNavbarMenu(false)}
                    style={{
                      color: "#FFFF",
                      position: "absolute",
                      right: 0,
                      top: "12px",
                      cursor: "pointer",
                      zIndex: "999999999",
                    }}
                  />
                  <HeaderNavItems>
                    <ListHeaderNavItems
                      initial={{ top: "-224px" }}
                      animate={{ top: "10em", transition: { delay: "4.2s" } }}
                      onEnded={{ top: "-225px" }}
                    >
                      <MobileMenuTop>
                        <Logo>
                          <Link
                            style={{ color: "#fff", textDecoration: "none" }}
                            to="/home"
                          >
                            <h3> Shop Vista</h3>
                          </Link>
                        </Logo>
                        <Link
                          style={{ color: "#fff", textDecoration: "none" }}
                          to="/home"
                        >
                          <List onClick={() => setNavbarMenu(!NavbarMenu)}>
                            Home
                          </List>
                        </Link>
                        <Link
                          style={{ color: "#fff", textDecoration: "none" }}
                          to="/products"
                        >
                          <List onClick={() => setNavbarMenu(!NavbarMenu)}>
                            Products
                          </List>
                        </Link>

                        <List>
                          <Link
                            style={{ color: "#fff", textDecoration: "none" }}
                            to="/subscription"
                          >
                            <p onClick={() => setNavbarMenu(!NavbarMenu)}>
                              Subscription
                            </p>
                          </Link>
                        </List>
                        <List>
                          {UserAuthData.data.IsSeller == false ? (
                            <>
                              <Link
                                style={{
                                  color: "#fff",
                                  textDecoration: "none",
                                }}
                                to="/sellerForm"
                                onClick={() =>
                                  setShowMoreOptions(!setShowMoreOptions)
                                }
                              >
                                <p>Become seller</p>
                              </Link>
                            </>
                          ) : (
                            ""
                          )}
                        </List>
                        <List>
                          {UserAuthData.data.IsSeller == true ? (
                            <>
                              {" "}
                              <List>
                                <Link
                                  style={{
                                    color: "#fff",
                                    textDecoration: "none",
                                  }}
                                  to="/SellerDashboard"
                                  onClick={() =>
                                    setShowMoreOptions(!setShowMoreOptions)
                                  }
                                >
                                  <p>Seller Dashboard</p>
                                </Link>
                              </List>
                            </>
                          ) : (
                            ""
                          )}
                        </List>
                      </MobileMenuTop>

                      <MobileMenuBottom>
                        <Link
                          style={{ color: "#fff", textDecoration: "none" }}
                          to="/orders"
                        >
                          <List onClick={() => setNavbarMenu(!NavbarMenu)}>
                            My orders
                          </List>
                        </Link>
                        <Link
                          style={{ color: "#fff", textDecoration: "none" }}
                          to="/cart"
                        >
                          <List onClick={() => setNavbarMenu(!NavbarMenu)}>
                            My cart
                          </List>
                        </Link>
                        <Link
                          style={{ color: "#fff", textDecoration: "none" }}
                          to="/accounts"
                        >
                          <List onClick={() => setNavbarMenu(!NavbarMenu)}>
                            My Account
                          </List>
                        </Link>
                      </MobileMenuBottom>
                    </ListHeaderNavItems>
                  </HeaderNavItems>
                </HeaderNavContainer>
              </>
            ) : (
              ""
            )}
          </HeaderNavigationMobile>
        </HeaderNavigation>
      </Content>
      <HeaderCategory>
        <Category
          drag="x"
          dragConstraints={{
            left: -1,
            right: 1,
          }}
          dragElastic={0.09}
        >
          <Link
            to="/category?query=Home"
            style={{ color: "black", textDecoration: "none" }}
          >
            {" "}
            Home
          </Link>
        </Category>
        <Category
          drag="x"
          dragConstraints={{
            left: -1,
            right: 1,
          }}
          dragElastic={0.09}
        >
          <Link
            to="/category?query=Electronics"
            style={{ color: "black", textDecoration: "none" }}
          >
            {" "}
            Electronics
          </Link>
        </Category>
        <Category
          drag="x"
          dragConstraints={{
            left: -1,
            right: 1,
          }}
          dragElastic={0.09}
        >
          <Link
            to="/category?query=Mobiles"
            style={{ color: "black", textDecoration: "none" }}
          >
            {" "}
            Mobiles
          </Link>
        </Category>
        <Category
          drag="x"
          dragConstraints={{
            left: -1,
            right: 1,
          }}
          dragElastic={0.09}
        >
          <Link
            to="/category?Query=tv"
            style={{ color: "black", textDecoration: "none" }}
          >
            {" "}
            Tv's
          </Link>
        </Category>
        <Category
          drag="x"
          dragConstraints={{
            left: -1,
            right: 1,
          }}
          dragElastic={0.09}
        >
          <Link
            to="/category?query=Computers"
            style={{ color: "black", textDecoration: "none" }}
          >
            {" "}
            Computers
          </Link>
        </Category>
        <Category
          drag="x"
          dragConstraints={{
            left: -1,
            right: 1,
          }}
          dragElastic={0.09}
        >
          <Link
            to="/category?query=Kitchen"
            style={{ color: "black", textDecoration: "none" }}
          >
            {" "}
            Kitchen
          </Link>
        </Category>
        <Category
          drag="x"
          dragConstraints={{
            left: -1,
            right: 1,
          }}
          dragElastic={0.09}
        >
          <Link
            to="/category?query=Fashion"
            style={{ color: "black", textDecoration: "none" }}
          >
            {" "}
            Fashion
          </Link>
        </Category>
        <Category
          drag="x"
          dragConstraints={{
            left: -1,
            right: 1,
          }}
          dragElastic={0.004}
        >
          <Link
            to="/category?query=Garden"
            style={{ color: "black", textDecoration: "none" }}
          >
            Garden
          </Link>
        </Category>
      </HeaderCategory>
    </Container>
  );
};

export default Header;
const Container = styled(motion.div)`
  width: 100%;
  height: 20%;
  transition: top 0.3s ease-in-out;
  position: relative;
`;
const Content = styled.div`
  width: 100%;
  height: 20%;
  position: fixed;
  z-index: 2147483754;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0);
  animation: shadowFade 2s infinite alternate;
  @keyframes shadowFade {
    0% {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0);
    }
    50% {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    }
    100% {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    }
  }
  top: 0;
  @media (max-width: 760px) {
    width: 100%;
    height: 20%;
    position: inherit;
  }
`;
const HeaderNavigation = styled.div`
  display: flex;
  height: 100%;
  background-color: var(--header_bg);
  align-items: center;
  width: 100%;

  @media (max-width: 760px) {
    position: fixed;
    z-index: 2147483754;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0);
    animation: shadowFade 2s infinite alternate;
    @keyframes shadowFade {
      0% {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0);
      }
      50% {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
      }
      100% {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
      }
    }
    top: 0;
    width: 100%;
    flex-direction: row;
    height: 15%;
    align-items: center;
    & li {
      display: none;
    }
  }
  .Avatar {
    display: none;
  }
`;
const HeaderNavigationMobile = styled.div`
  display: none;
  @media (max-width: 760px) {
    display: flex;
    position: absolute;
    right: 0;
    top: 1em;
    .MuiSvgIcon-root {
      color: white;
    }
  }
`;

const List = styled(motion.li)`
  list-style: none;
  margin: 0.2em;
  padding: 1em;
  :hover {
    color: white;
    cursor: pointer;
  }
`;
const SearchBar = styled.input`
  width: 100%;
  outline: none;
  color: #fff;
  background-color: #3b3b3b;
  border: transparent;
  border-radius: 0.3em;
`;

const MuiIcons = styled.div`
  background-color: #3b3b3b;
  width: 40%;
  display: flex;
  align-items: center;
  margin: 3.8em;
  padding: 0.3em;

  border: transparent;
  border-radius: 0.3em;
  @media (max-width: 760px) {
    margin-top: 0%;
    margin: 1.2em;
    padding: 0.1em;
  }
`;
const HeaderCategory = styled(motion.div)`
  width: 100%;
  display: flex;
  overflow: scroll;
  margin: 8rem 0 -2rem 0;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Category = styled(motion.div)`
  padding: 0.2em;
  margin: 2em;
  background-color: #ffff;
  font-size: 0.8em;
  color: #111111;
  border-radius: 0.7em;
  min-width: 8em;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.25);
  :hover {
    color: black;
    cursor: pointer;
  }
`;

const Logo = styled.div`
  list-style: none;
  margin: 1.2em;
  padding: 1em;
  :hover {
    color: white;
    cursor: pointer;
  }
`;
const HeaderNavContainer = styled(motion.div)`
  width: 40%;
  background-color: #111111;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  border: 1px solid rgba(139, 139, 139, 0.25);
`;
const HeaderNavItems = styled.div`
  color: #ffff;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: start;
  & li {
    display: inline;
    color: #ffff;
  }
  & h2 {
  }
  position: absolute;
  z-index: 99999999;
  height: 100%;
`;

const ListHeaderNavItems = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
  margin: 1.2em;
  padding: 1em;
  width: 100%;

  margin: 12px;

  & li {
    @media (max-width: 480px) {
    }
    width: 70%;
    margin: 0;
    display: flex;
    justify-content: space-between;

    border-radius: 1em;
    margin-top: 1em;
  }
`;

const MobileMenuBottom = styled.div`
  width: 100%;
  height: 100%;
`;
const MobileMenuTop = styled.div`
  width: 100%;
  height: 100%;
`;


const OptionContainer=styled(motion.div)`
display:flex;
flex-direction: column;
align-items: center;
width:20%;
background-color: #231e1e;
position: absolute;
right: 0%;
top:00%;
border-radius: 0.4rem ;
border: 1px solid black;
`