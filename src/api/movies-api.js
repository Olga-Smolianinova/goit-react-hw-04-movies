import axios from 'axios';

const baseURL = 'https://api.themoviedb.org/3';
const apiKey = 'a524e22e3630cf24a2e0a24a461145a2';

//1) HomePage http-запрос за популярными фильмами
const fetchPopularMovies = () => {
  return axios
    .get(`${baseURL}/movie/popular?api_key=${apiKey}&page=1`)
    .then(({ data }) => data)
    .catch(error => error);
};
// console.log(fetchPopularMovies);

//2) MovieDetailsPage http-запрос полной информации о фильме для страницы кинофильма. При подключении в  MovieDetailsPage выдает ошибку - на CORS politics
const fetchMovieDetails = movieId => {
  // выносим в отдельную переменную movieId - значение this.props.match.params.movieId
  //   const movieId = this.props.match.params.movieId;

  return axios
    .get(`${baseURL}/movie/${movieId}?api_key=${apiKey}`)
    .then(({ data }) => data)
    .catch(error => error);
};

// 3) Cast. Http-запрос об актёрском составе для страницы MovieDetailsPage
const fetchCast = movieId => {
  return axios
    .get(`${baseURL}/movie/${movieId}/credits?api_key=${apiKey}`)
    .then(({ data }) => data)
    .catch(error => error);
};

// Previews. Http-запрос об информация об обзорах для страницы MovieDetailsPage
const fetchReviews = movieId => {
  return axios
    .get(`${baseURL}/movie/${movieId}/reviews?api_key=${apiKey}`)
    .then(({ data }) => data)
    .catch(error => error);
};

// 5) Search. Http-запрос для поиска кинофильма по ключевому слову на странице MoviesPage
const fetchSearchMovies = ({ searchQuery = '' }) => {
  return axios
    .get(`${baseURL}/search/movie?query=${searchQuery}&api_key=${apiKey}`)
    .then(({ data }) => data)
    .catch(error => error);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetchPopularMovies,
  fetchMovieDetails,
  fetchSearchMovies,
  fetchCast,
  fetchReviews,
};
