import { useQuery } from "react-query";
import { getMovie, getTv, IGetMovieResult, IGetTvResult } from "../../api";
import { useHistory, useRouteMatch } from "react-router-dom";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import styled from "styled-components";
import { makeImagePath } from "../../utils";
import { useEffect } from "react";

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
  overflow: scroll;
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

const BigInfo = styled.p`
  padding: 0 30px;
  position: relative;
  top: -60px;
  color: white;
  font-size: 20px;
  overflow: scroll;
`;

export default function TvSliderOverlay({ animateId }: { animateId: string }) {
  const { scrollY } = useScroll();
  const history = useHistory();

  const bigTvMatch = useRouteMatch<{ tvId: string }>("/movie/tv/tvs/:tvId");
  const { data, isLoading } = useQuery<IGetTvResult>(
    ["movie", bigTvMatch?.params.tvId],
    () => getTv(bigTvMatch?.params.tvId + "")
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onOverlayClicked = () => history.goBack();

  return (
    <>
      <AnimatePresence>
        {bigTvMatch ? (
          <>
            <Overlay
              onClick={onOverlayClicked}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigMovie
              style={{ top: scrollY.get() + 90 }}
              layoutId={bigTvMatch.params.tvId + animateId}
            >
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      data?.poster_path + "",
                      "w500"
                    )})`,
                  }}
                />
                <BigTitle>{data?.name}</BigTitle>
                <BigOverview>{data?.overview}</BigOverview>
                <BigInfo>
                  Number of Seasons {data?.number_of_seasons}
                  <br />
                  Number of Episodes {data?.number_of_episodes}
                </BigInfo>
              </>
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
