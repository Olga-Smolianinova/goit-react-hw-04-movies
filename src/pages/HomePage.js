import React, { Component } from 'react';

// import axios from 'axios';

// Components
import FilmsList from '../components/FilmsList';

// Data
import moviesApi from '../api/movies-api'; //import файла, который прописывает логику настроек Api для http-запросов

class HomePage extends Component {
  state = {
    films: [],
  };

  // ЖИЗНЕННЫЕ ЦИКЛЫ
  // при Mount компонента, делаем http-запрос, в результате которого отрисовываются все популярные фильмы при переходе на страницу HOME с помощью async await
  async componentDidMount() {
    // логику http-запроса подтягиваем из специально для этого созданого файла api->movies-api c різними методами
    await moviesApi.fetchPopularMovies().then(({ results }) => {
      // console.log(results);

      this.setState({ films: [...results] });
    });
  }

  render() {
    return (
      <div>
        {/* import component FilmsList в props которому передаем массив фильмов */}
        <FilmsList films={this.state.films} />
      </div>
    );
  }
}

export default HomePage;
