import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 23vh;
`;

const Title = styled.h1`
  font-size: xx-large;
  font-weight: 400;
  letter-spacing: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10vh;
  margin-top: 15vh;
`;

const Menu = styled(motion.span)`
  font-weight: 100;
  font-size: x-large;
  letter-spacing: 10px;
  padding-left: 20px;
  padding-right: 10px;
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.bgColor};
`;

export default function Home() {
  return (
    <>
      <Header>
        <Title>😆Welcome😆</Title>
      </Header>
      <Container>
        <Menu
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { duration: 0.5 } }}
          whileHover={{ scale: 2 }}
        >
          <Link to={"/coin"}>Link to Coin</Link>
        </Menu>
        <Menu
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { duration: 0.5 } }}
          whileHover={{ scale: 2 }}
        >
          <Link to={"/todo"}>Link to To Do </Link>
        </Menu>
      </Container>
    </>
  );
}
