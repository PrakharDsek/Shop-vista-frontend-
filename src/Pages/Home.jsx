import styled from "styled-components";
import { motion } from "framer-motion";
import Cookies from "js-cookie";


import HomePage from "../Components/Home.jsx";
import { useLocation } from "react-router-dom";

const Home = ({BackendURL}) => {

  return (
    <Container>
      <Content>
        <HomeContent>
          <HomePage BackendURL={BackendURL}/>
        </HomeContent>
      </Content>
    </Container>
  );
};

export default Home;

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
`;
const HomeContent = styled.div``;
