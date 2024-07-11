import { useQuery } from "react-query";
import { getSearch, IGetMoviesResult } from "../api";
import { useLocation } from "react-router-dom";
import { makeImagePath } from "../utils";
import styled from "styled-components";

const Img = styled.img`
  width: 30%;
`;

export default function Search() {
  const location = useLocation();
  const keyword = location.search.split("=")[1];

  const { data, isLoading } = useQuery<IGetMoviesResult>("search", () =>
    getSearch(keyword + "")
  );

  return (
    <>
      {data?.results.map((movie) => (
        <div>
          <h4>{movie.title}</h4>
          <p>{movie.overview}</p>
          {movie.poster_path ? (
            <Img src={makeImagePath(movie.poster_path)}></Img>
          ) : null}
        </div>
      ))}
    </>
  );
}
