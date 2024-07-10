import { useQuery } from "react-query";
import { IGetMoviesResult, getMovies, getUpcoming, getTop } from "../api";
import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils";
import Header from "../components/Movie/Header";
import SliderRow from "../components/Movie/SliderRow";

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

function Movie() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "Banner"],
    getMovies
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
              <Title>{data?.results[0].title}</Title>
              <Overview>{data?.results[0].overview}</Overview>
            </Banner>

            <SliderRow
              offset={offset}
              api={getMovies}
              category={"Now Playing"}
            />
            <SliderRow offset={offset} api={getTop} category={"Top Rates"} />
            <SliderRow
              offset={offset}
              api={getUpcoming}
              category={"Upcoming"}
            />
          </>
        )}
      </Wrapper>
    </>
  );
}

export default Movie;
