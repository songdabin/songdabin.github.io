import { useQuery } from "react-query";
import { getAiring, getPopular, getTopTv, IGetTVsResult } from "../api";
import Header from "../components/Movie/Header";
import { makeImagePath } from "../utils";
import styled from "styled-components";
import { motion } from "framer-motion";
import TvSliderRow from "../components/Tv/TvSliderRow";

const Wrapper = styled(motion.div)`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h3`
  font-size: 58px;
  margin-bottom: 20px;
  color: whitesmoke;
`;

const Overview = styled.p`
  font-size: 26px;
  width: 50%;
  color: whitesmoke;
`;

const offset = 6;

export default function Tv() {
  const { data, isLoading } = useQuery<IGetTVsResult>(
    ["tv", "Banner"],
    getAiring
  );

  return (
    <>
      <Header />
      <Wrapper>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Banner
              bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
            >
              <Title>{data?.results[0].name}</Title>
              <Overview>{data?.results[0].overview}</Overview>
            </Banner>

            <TvSliderRow
              animateId={"at"}
              offset={offset}
              api={getAiring}
              category={"Airing Today"}
            />

            <TvSliderRow
              animateId={"p"}
              offset={offset}
              api={getPopular}
              category={"Popular"}
            />

            <TvSliderRow
              animateId={"tr"}
              offset={offset}
              api={getTopTv}
              category={"Top Rated"}
            />
          </>
        )}
      </Wrapper>
    </>
  );
}
