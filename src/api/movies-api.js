import axios from 'axios';

const baseURL = 'https://api.themoviedb.org/3';
const apiKey = 'a524e22e3630cf24a2e0a24a461145a2';

//1) HomePage http-запрос за популярными фильмами
const fetchPopularMovies = () => {
  return axios
    .get(`${baseURL}/movie/popular?api_key=${apiKey}&page=1`)
    .then(({ data }) => data);
};
// console.log(fetchPopularMovies);

//2) MovieDetailsPage http-запрос полной информации о фильме для страницы кинофильма. При подключении в  MovieDetailsPage выдает ошибку - на CORS politics
// const fetchMovieDetails = movieId => {
//   // выносим в отдельную переменную movieId - значение this.props.match.params.movieId
//   //   const movieId = this.props.match.params.movieId;

//   return axios
//     .get(`https://api.themoviedb.org/3}/movie/${movieId}?api_key=${apiKey}`)
//     .then(({ data }) => data);
// };

// eslint-disable-next-line import/no-anonymous-default-export
export default { fetchPopularMovies };
