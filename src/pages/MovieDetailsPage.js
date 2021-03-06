import React, { Component, Suspense, lazy } from 'react';

import { NavLink, Route, Switch } from 'react-router-dom';

import routes from '../routes';

// Data
import moviesApi from '../api/movies-api'; //import файла, который прописывает логику настроек Api для http-запросов

import defaultImg from '../images/default.jpg';

//Components. Dynamic import. Chunkование. Lazy
const Cast = lazy(() =>
  import('../components/Cast' /* webpackChunkName: "cast-page" */),
);

const Reviews = lazy(() =>
  import('../components/Reviews' /* webpackChunkName: "reviews-page" */),
);

class MovieDetailsPage extends Component {
  state = {
    movie: [],
    genres: [],
    error: null,
  };

  // ЖИЗНЕННЫЕ ЦИКЛЫ
  // для отрисовки страницы с информацией только об одной книге делаем http-запрос

  componentDidMount() {
    // выносим в отдельную переменную movieId - значение this.props.match.params.movieId
    const movieId = this.props.match.params.movieId;

    // MovieDetailsPage http-запрос полной информации о фильме для страницы кинофильма по его id.
    moviesApi
      .fetchMovieDetails(movieId)
      .then(data => {
        // console.log(data);
        // console.log(data.genres);

        this.setState({
          movie: data,
          genres: [...data.genres],
        });
      })
      .catch(error => this.setState({ error }));
  }

  // МЕТОДЫ

  // для обрезки release_date
  getYear = data => String(data).slice(0, 4);

  // перевести в % vote_average и отобразить значение в <p> User Score: {vote_average}% </p>
  getPercent = vote => vote * 10;

  //  Клик по Кнопке "Go back"
  handleButtonGoBack = () => {
    const { location, history } = this.props;

    // если пользователь напрямую перешел на страницу одной книге, это первая страница - при клике "Вернуться назад" будет ошибка т.к. location.state.from - undefined. В этом случае добавляем проверку

    // новый метод 2020: optional chaining (?.) - оператор state и from, || - если нет, то перекинь на routes.home
    history.push(location?.state?.from || routes.home);

    // При клике кладем новую запись в location (метод push - добавить новую, replace - заменить старую)  и возвращаемся обратно откуда были перенаправлены на текущую страницу
    // (oldSchool метод)
    // if (location.state && location.state.from) {
    //   return history.push(location.state.from);
    // }
    // history.push(routes.home);
  };

  render() {
    const {
      poster_path,
      original_title,
      release_date,
      vote_average,
      overview,
    } = this.state.movie;

    const { genres, error } = this.state;

    return (
      <>
        <section>
          {/* Div FilmDetails */}

          {/* Кнопка "Go Back". При клике кладем новую запись в location (метод push - добавить новую, replace - заменить старую)  и возвращаемся обратно на шаг назад */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleButtonGoBack}
          >
            Go back
          </button>

          <div className="CardWrapper">
            <div className="Card-img">
              {/* Информация о movie. Для указания пути в src применяем getImgUrl из МЕТОДОВ */}
              <img
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w342/${poster_path}`
                    : defaultImg
                }
                alt={original_title}
                width="342"
              />
            </div>

            <div className="card">
              {/* Title. Для обрезки даты применяем метод getYear, который описан в МЕТОДАХ */}
              <h2 className="card-title">
                {original_title} ({this.getYear(release_date)})
              </h2>

              {/* User Score. Для вывода данных в % метод getPercent из МЕТОДОВ */}
              <p className="card-text">
                User Score: {this.getPercent(vote_average)}%{' '}
              </p>

              <h3 className="card-subtitle mb-2 text-muted">Overview </h3>

              <p className="card-text">{overview}</p>

              <h3 className="card-subtitle mb-2 text-muted">Genres</h3>

              <ul>
                {genres.map(({ id, name }) => (
                  <li key={id}>{name}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* div CAST&REVIEWS */}
          {/* CAST */}
          <div>
            <h3>Additional information</h3>

            <ul className="list-group">
              <li className="list-group-item list-group-item-info">
                {/* для создания вложенного маршрута, чтобы информация cast (актерский состав) при
              клике отрисовывалась на той же странице оборачиваем в NavLink */}
                <NavLink
                  to={{
                    pathname: `${this.props.match.url}/cast`,
                    state: { ...this.props.location.state },
                  }}
                  className="nav-link"
                  activeClassName="active"
                >
                  Cast
                </NavLink>
              </li>
              <li className="list-group-item list-group-item-info">
                <NavLink
                  to={{
                    pathname: `${this.props.match.url}/reviews`,
                    state: { ...this.props.location.state },
                  }}
                  className="nav-link"
                  activeClassName="active"
                >
                  Reviews
                </NavLink>
              </li>
            </ul>

            {/* для создания вложенного маршрута, чтобы информация о Cast&Reviews при клике отрисовывалась на той же странице оборачиваем в NavLink. В этом случае  Route создаем на той же странице*/}
            <Suspense fallback={<h2>Loading...</h2>}>
              <Switch>
                {/* CAST */}
                <Route
                  exact
                  path={`${this.props.match.path}/cast`}
                  component={Cast}
                />

                {/* REVIEWS */}
                <Route
                  exact
                  path={`${this.props.match.path}/reviews`}
                  component={Reviews}
                />
              </Switch>
            </Suspense>
          </div>

          {/* для обработки ошибок (error), рендер по условию. */}
          {error && <h3 className="ErrorMessage">{error.message}</h3>}
        </section>
      </>
    );
  }
}

export default MovieDetailsPage;
