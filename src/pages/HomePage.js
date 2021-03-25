import React, { Component } from 'react';

// import axios from 'axios';

// Components
import FilmsList from '../components/FilmsList';

// Data
import moviesApi from '../api/movies-api'; //import файла, который прописывает логику настроек Api для http-запросов

class HomePage extends Component {
  state = {
    films: [],
    error: null,
  };

  // ЖИЗНЕННЫЕ ЦИКЛЫ
  // при Mount компонента, делаем http-запрос, в результате которого отрисовываются все популярные фильмы при переходе на страницу HOME с помощью async await
  componentDidMount() {
    // логику http-запроса подтягиваем из специально для этого созданого файла api->movies-api c різними методами
    moviesApi
      .fetchPopularMovies()
      .then(({ results }) => {
        // console.log(results);

        this.setState({ films: [...results] });
      })
      .catch(error => this.setState({ error }));
  }

  render() {
    const { error } = this.state;

    return (
      <div>
        <h2>Tranding today:</h2>

        {/* import component FilmsList в props которому передаем массив фильмов */}
        <FilmsList films={this.state.films} />

        {/* для обработки ошибок (error), рендер по условию. */}
        {error && <h3 className="ErrorMessage">{error.message}</h3>}
      </div>
    );
  }
}

export default HomePage;
