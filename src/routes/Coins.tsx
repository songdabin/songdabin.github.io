import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";
import { motion } from "framer-motion";
import { useState } from "react";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul`
  padding-left: 0;
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  font-weight: bold;
`;

const Loader = styled.div`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const ToggleDiv = styled(motion.div)`
  width: 65px;
  height: 35px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const ToggleBtn = styled(motion.div)`
  width: 25px;
  height: 25px;
  border-radius: 20px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 3;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setDarkAtom((prev) => !prev);
    setToggle((toggle) => !toggle);
  };

  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <>
      <Menu>
        {toggle ? (
          <ToggleDiv
            onClick={handleToggle}
            style={{ backgroundColor: "white", border: "1px solid lightblue" }}
          >
            <ToggleBtn
              layoutId="toggleBtn"
              style={{ marginLeft: 35, backgroundColor: "lightblue" }}
            />
          </ToggleDiv>
        ) : (
          <ToggleDiv
            onClick={handleToggle}
            style={{ backgroundColor: "lightblue" }}
          >
            <ToggleBtn
              layoutId="toggleBtn"
              style={{ marginLeft: 5, backgroundColor: "white" }}
            />
          </ToggleDiv>
        )}
      </Menu>
      <Container>
        <Helmet>
          <title>Coin</title>
        </Helmet>
        <Header>
          <Title>Coin</Title>
        </Header>
        {isLoading ? (
          <Loader>Loading ...</Loader>
        ) : (
          <CoinsList>
            {data?.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link
                  to={{
                    pathname: `/${coin.id}`,
                    state: { name: coin.name },
                  }}
                >
                  <Img
                    src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </Container>
    </>
  );
}

export default Coins;
