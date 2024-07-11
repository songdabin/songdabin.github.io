import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { IGetMoviesResult } from "../../api";
import { useQuery } from "react-query";
import { makeImagePath } from "../../utils";
import { useHistory } from "react-router-dom";
import useWindowDimensions from "./useWindowDimensions";
import SliderOverlay from "./SliderOverlay";

const Slider = styled.div`
  position: relative;
  top: -100px;
  margin-bottom: 30vh;
`;

const SliderTitle = styled.p`
  color: white;
  font-size: 20px;
  padding: 0 20px;
  cursor: pointer;
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

interface IProps {
  animateId: string;
  offset: number;
  api: () => Promise<IGetMoviesResult>;
  category: string;
}

export default function SliderRow({
  animateId,
  offset,
  api,
  category,
}: IProps) {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movie", category],
    api
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const history = useHistory();
  const width = useWindowDimensions();

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
  const onBoxCLicked = (movieId: number) => {
    history.push(`/movie/movies/${movieId}`);
  };

  // const clickedMovie =
  //   bigMovieMatch?.params.movieId &&
  //   data?.results.find(
  //     (movie) => String(movie.id) === bigMovieMatch.params.movieId
  //   );

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
                  layoutId={movie.id + animateId}
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
      <SliderOverlay animateId={animateId} />
    </>
  );
}
