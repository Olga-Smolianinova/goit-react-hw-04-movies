import React, { Component } from 'react';

import axios from 'axios';

class MovieDetailsPage extends Component {
  state = {
    movie: [],
    genres: [],
  };

  // ЖИЗНЕННЫЕ ЦИКЛЫ
  // для отрисовки страницы с информацией только об одной книге делаем http-запрос
  // При подключении  метода из movies-api   выдает ошибку - на CORS politics. Подключаю напрямую
  async componentDidMount() {
    const apiKey = 'a524e22e3630cf24a2e0a24a461145a2';

    // выносим в отдельную переменную movieId - значение this.props.match.params.movieId
    const movieId = this.props.match.params.movieId;

    // http-запрос за фильмом по его id
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
    );
    // console.log(response.data);
    // console.log(response.data.genres);

    this.setState({
      movie: response.data,
      genres: response.data.genres,
    });
  }

  // МЕТОДЫ
  // для обрезки даты (способ 1)
  getYear = data => String(data).slice(0, 4);

  // перевести в % vote_average и отобразить значение в <p> User Score: {vote_average}% </p>
  getPercent = vote => vote * 10;

  render() {
    const {
      backdrop_path,
      original_title,
      release_date,
      vote_average,
      overview,
    } = this.state.movie;

    const { genres } = this.state;

    // обработка пути для img
    const getImgUrl = `https://image.tmdb.org/t/p/w500/${backdrop_path}`;

    return (
      <section>
        {/* Информация о movie */}
        <img src={getImgUrl} alt={original_title} />

        {/* Title. Для обрезки даты применяем метод getYear, который описан в МЕТОДАХ */}
        <h2>
          {original_title} ({this.getYear(release_date)})
        </h2>

        {/* User Score. Для вывода данных в % метод getPercent из МЕТОДОВ */}
        <p>User Score: {this.getPercent(vote_average)}% </p>

        <h3>Overview </h3>
        <p>{overview}</p>

        <h3>Genres</h3>

        <ul>
          {genres.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      </section>
    );
  }
}

export default MovieDetailsPage;
