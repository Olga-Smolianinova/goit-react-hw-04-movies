import React, { Component } from 'react';

// Components
import SearchForm from '../components/SearchForm';

import FilmsList from '../components/FilmsList';

// Data
import moviesApi from '../api/movies-api'; //import файла, который прописывает логику настроек Api для http-запросов

class MoviesPage extends Component {
  state = {
    searchQuery: '', //чтобы между разными запросами могли сохранить query, по которому делаем запрос и он же отрисовывался дальше при нажатии на  Load more
    films: [],
  };

  // ЖИЗНЕННЫЕ ЦИКЛЫ
  componentDidUpdate(prevProps, prevState) {
    //  добавляем условие, что если компонент обновился и обновилось именно свойство searchQuery ({ searchQuery: query }) тогда в этом случае делаем http-запрос. (если этого не сделать http-запрос делается с пустой сторокой (searchQuery: '') и не возвращает результат)
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchFilms();
    }
  }

  // МЕТОДЫ
  changeQuery = query => {
    // console.log(query);

    this.setState({
      searchQuery: query,
    });
  };

  //выносим http-запрос в отдельный метод для удобства переиспользования
  fetchFilms = () => {
    const { searchQuery } = this.state;

    //   выводим в отдельную переменную  searchQuery, currentPage для того, чтобы передать options в props в movies-api.js;
    const options = { searchQuery };

    // вызов функции из файла который прописывает логику настроек Api (movies-api.js)
    moviesApi.fetchSearchMovies(options).then(({ results, total_results }) => {
      // console.log(results);

      this.setState({
        films: [...results],
      });
    });
  };

  render() {
    return (
      <>
        {/* Вставка SearchForm. В props передаем метод, который будет отрабатываться при submit формы */}
        <SearchForm onSubmit={this.changeQuery} />

        {/* import component FilmsList в props которому передаем массив фильмов */}
        <FilmsList films={this.state.films} />
      </>
    );
  }
}

export default MoviesPage;
