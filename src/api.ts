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

interface IMovie {
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

export function getMovies() {
  return fetch(`${MOVIE_BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

// https://api.themoviedb.org/3/search/multi?api_key=a911dbc58bc57860248c2db02d2c0f39&query=%22dune%22
