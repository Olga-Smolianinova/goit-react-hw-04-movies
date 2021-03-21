import React, { Component } from 'react';

import { NavLink, Route, Switch } from 'react-router-dom';

// import axios from 'axios';

// Data
import moviesApi from '../api/movies-api'; //import файла, который прописывает логику настроек Api для http-запросов

class MovieDetailsPage extends Component {
  state = {
    movie: [],
    genres: [],

    // для блока CAST&REVIEWS
    cast: [],
    reviews: [],
  };

  // ЖИЗНЕННЫЕ ЦИКЛЫ
  // для отрисовки страницы с информацией только об одной книге делаем http-запрос

  async componentDidMount() {
    // выносим в отдельную переменную movieId - значение this.props.match.params.movieId
    const movieId = this.props.match.params.movieId;

    // MovieDetailsPage http-запрос полной информации о фильме для страницы кинофильма по его id.
    await moviesApi.fetchMovieDetails(movieId).then(data => {
      // console.log(data);
      // console.log(data.genres);

      this.setState({
        movie: data,
        genres: [...data.genres],
      });
    });

    //  Cast. Http-запрос об актёрском составе для страницы MovieDetailsPage
    await moviesApi.fetchCast(movieId).then(results => {
      // console.log(results.cast);

      this.setState({ cast: [...results.cast] });
    });

    // Previews. Http-запрос об информация об обзорах для страницы MovieDetailsPage
    await moviesApi.fetchReviews(movieId).then(({ results }) => {
      console.log(results);

      this.setState({
        reviews: [...results],
      });
    });
  }

  // МЕТОДЫ
  // обработка пути для img
  getImgUrl = (size, filePath) =>
    `https://image.tmdb.org/t/p/w${size}/${filePath}`;

  // для обрезки release_date
  getYear = data => String(data).slice(0, 4);

  // перевести в % vote_average и отобразить значение в <p> User Score: {vote_average}% </p>
  getPercent = vote => vote * 10;

  render() {
    const {
      poster_path,
      original_title,
      release_date,
      vote_average,
      overview,
    } = this.state.movie;

    const { genres } = this.state;

    return (
      <>
        <section>
          {/* Div FilmDetails */}
          <div>
            {/* Информация о movie. Для указания пути в src применяем getImgUrl из МЕТОДОВ */}
            <img src={this.getImgUrl(185, poster_path)} alt={original_title} />

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
          </div>

          {/* div CAST&REVIEWS */}
          {/* CAST */}
          <div>
            <h3>Additional information</h3>
            <ul>
              <li>
                {/* для создания вложенного маршрута, чтобы информация cast (актерский состав) при
              клике отрисовывалась на той же странице оборачиваем в NavLink */}
                <NavLink to={`${this.props.match.url}/cast`}>Cast</NavLink>
              </li>
              <li>
                <NavLink to={`${this.props.match.url}/reviews`}>
                  Reviews
                </NavLink>
              </li>
            </ul>

            {/* для создания вложенного маршрута, чтобы информация о Cast&Reviews при клике отрисовывалась на той же странице оборачиваем в NavLink. В этом случае  Route создаем на той же странице*/}
            <Switch>
              <Route
                exact
                path={`${this.props.match.path}/cast`}
                render={props => {
                  // console.log(props);
                  // console.log(this.state.cast);

                  const { cast } = this.state;

                  return (
                    <>
                      <ul>
                        {cast.map(({ id, name, character, profile_path }) => (
                          <li key={id}>
                            <img
                              src={this.getImgUrl(92, profile_path)}
                              alt={name}
                            />
                            <p>{name}</p>
                            <p>Character: {character}</p>
                          </li>
                        ))}
                      </ul>
                    </>
                  );
                }}
              />

              {/* REVIEWS */}
              <Route
                exact
                path={`${this.props.match.path}/reviews`}
                render={props => {
                  // console.log(props);
                  // console.log(this.state.cast);

                  const { reviews } = this.state;

                  return (
                    <>
                      <ul>
                        {reviews.map(({ id, author, content }) => (
                          <li key={id}>
                            <h4> Author: {author}</h4>
                            <p>{content}</p>
                          </li>
                        ))}
                      </ul>
                    </>
                  );
                }}
              />
            </Switch>
          </div>
        </section>
      </>
    );
  }
}

export default MovieDetailsPage;
