const COIN_BASE_URL = process.env.REACT_APP_COIN_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const MOVIE_BASE_PATH = process.env.REACT_APP_MOVIE_BASE_PATH;

export function fetchCoins() {
  return fetch(`${COIN_BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${COIN_BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${COIN_BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  ).then((response) => response.json());
}

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetMovieResult {
  belongs_to_collection: any;
  budget: number;
  homepage: string;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export function getMovies() {
  return fetch(`${MOVIE_BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getMovie(id: string) {
  return fetch(`${MOVIE_BASE_PATH}/movie/${id}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getUpcoming() {
  return fetch(`${MOVIE_BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTop() {
  return fetch(`${MOVIE_BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getSearch(keyword: string) {
  return fetch(
    `${MOVIE_BASE_PATH}/search/multi?api_key=${API_KEY}&query='${keyword}'`
  ).then((response) => response.json());
}

// https://api.themoviedb.org/3/search/multi?api_key=number&query=%22dune%22

interface ITv {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface IGetTVsResult {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

interface IGenre {
  id: number;
  name: string;
}

export interface IGetTvResult {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genres: IGenre[];
  homepage: string;
  id: number;
  last_air_date: string;
  // last_episode_to_air: {
  //   id: 5170856;
  //   name: "Burn It Down";
  //   overview: "Wildfires threaten the Seattle region, leading to a flood of patients and emergency procedures. The doctors juggle overcapacity in the ER, complex surgeries and personal stress. Meanwhile, Meredith makes a rash decision that can't be undone.";
  //   vote_average: 8;
  //   vote_count: 2;
  //   air_date: "2024-05-30";
  //   episode_number: 10;
  //   episode_type: "finale";
  //   production_code: "";
  //   runtime: 44;
  //   season_number: 20;
  //   show_id: 1416;
  //   still_path: "/7PyFEy7Ljs26Le9a2RiHhSaaTvC.jpg";
  // };
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export function getAiring() {
  return fetch(`${MOVIE_BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getPopular() {
  return fetch(`${MOVIE_BASE_PATH}/tv/popular?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTopTv() {
  return fetch(`${MOVIE_BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getTv(id: string) {
  return fetch(`${MOVIE_BASE_PATH}/tv/${id}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
