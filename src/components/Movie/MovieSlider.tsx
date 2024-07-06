import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";
import useWindowDimensions from "./useWindowDimensions";
import { useState } from "react";
import styled from "styled-components";
import { IGetMoviesResult } from "../../api";
import { makeImagePath } from "../../utils";

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  background-color: black;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
  height: 200px;
  font-size: 64px;
  width: 16.5vw;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: #2f2f2fbd;
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
    font-style: italic;
    color: whitesmoke;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: #2f2f2f;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: white;
  padding: 0 20px;
  font-size: 36px;
  position: relative;
  top: -60px;
  font-weight: 500;
`;

const BigOverview = styled.p`
  padding: 0 30px;
  position: relative;
  top: -60px;
  color: white;
  font-size: 20px;
  overflow: scroll;
`;

const SliderTitle = styled.p`
  color: white;
  font-size: 20px;
  padding: 0 20px;
  cursor: pointer;
`;

const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const InfoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

export default function MovieSlider({
  offset,
  data,
  category,
}: {
  offset: number;
  data?: IGetMoviesResult;
  category: string;
}) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>(
    "/movie/movies/:movieId"
  );
  const { scrollY } = useScroll();
  const width = useWindowDimensions();

  const onBoxCLicked = (movieId: number) => {
    history.push(`/movie/movies/${movieId}`);
  };
  const onOverlayClicked = () => history.goBack();
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => String(movie.id) === bigMovieMatch.params.movieId
    );
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;

      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <>
      <Slider>
        <SliderTitle onClick={increaseIndex}>{category + " >"}</SliderTitle>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            initial={{ x: width + 20 }}
            animate={{ x: 0 }}
            exit={{ x: -width - 20 }}
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  layoutId={movie.id + ""}
                  key={movie.id}
                  variants={BoxVariants}
                  whileHover="hover"
                  initial="normal"
                  transition={{ type: "tween" }}
                  bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                  onClick={() => onBoxCLicked(movie.id)}
                >
                  <Info variants={InfoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
      </Slider>
      <AnimatePresence>
        {bigMovieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClicked}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigMovie
              style={{ top: scrollY.get() + 90 }}
              layoutId={bigMovieMatch.params.movieId}
            >
              {clickedMovie && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickedMovie.backdrop_path,
                        "w500"
                      )})`,
                    }}
                  />
                  <BigTitle>{clickedMovie.title}</BigTitle>
                  <BigOverview>{clickedMovie.overview}</BigOverview>
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
