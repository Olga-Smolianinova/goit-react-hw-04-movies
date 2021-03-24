import React, { Component } from 'react';

import queryString from 'query-string';

// Components
import SearchForm from '../components/SearchForm';

import FilmsList from '../components/FilmsList';

// Data
import moviesApi from '../api/movies-api'; //import файла, который прописывает логику настроек Api для http-запросов

class MoviesPage extends Component {
  state = {
    searchQuery: '', //чтобы между разными запросами могли сохранить query, по которому делаем запрос и он же отрисовывался дальше при нажатии на  Load more
    error: null,
    films: [],
  };

  // ЖИЗНЕННЫЕ ЦИКЛЫ
  componentDidMount() {
    const { search, pathname } = this.props.location;

    // если есть данные в строке запроса, чтобы они отображались в адресной строке
    if (search && pathname) {
      this.setState({
        searchQuery: queryString.parse(search).query,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //  добавляем условие, что если компонент обновился и обновилось именно свойство searchQuery ({ searchQuery: query }) тогда в этом случае делаем http-запрос. (если этого не сделать http-запрос делается с пустой сторокой (searchQuery: '') и не возвращает результат)
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchFilms();
    }
  }

  // МЕТОДЫ
  changeQuery = query => {
    // console.log(query);

    const { history, location } = this.props;

    this.setState({
      searchQuery: query,
      // films при новом запросе перед начало обнулялся от предыдущих статей
      films: [],
      // при каждом следующем запросе обнуляем error
      error: null,
    });

    //     При выборе опции необходимо обновлять URL используя метод history.push() для добавления новой записи в журнал истории. Берем текущее значение location.pathname и обновляем search
    history.push({
      ...location,
      search: `query=${query}`,
    });
  };

  //выносим http-запрос в отдельный метод для удобства переиспользования
  fetchFilms() {
    const { searchQuery, error } = this.state;

    //   выводим в отдельную переменную  searchQuery, currentPage для того, чтобы передать options в props в movies-api.js;
    const options = { searchQuery, error };

    //проверка на то, если пользователь ничего не ввел в input, не отправлять http-запрос
    if (!searchQuery) {
      return;
    }

    // вызов функции из файла который прописывает логику настроек Api (movies-api.js)
    moviesApi
      .fetchSearchMovies(options)
      .then(({ results }) => {
        // console.log(results);

        //  условие, если массив данных  пустой
        if (results.length === 0) {
          throw new Error('No matches were found! Try again!');
        }

        this.setState({
          films: [...results],
        });
      })
      .catch(error => this.setState({ error }));
  }

  render() {
    const { error } = this.state;
    return (
      <>
        {/* Вставка SearchForm. В props передаем метод, который будет отрабатываться при submit формы */}
        <SearchForm onSubmit={this.changeQuery} />
        {/* import component FilmsList в props которому передаем массив фильмов */}
        <FilmsList films={this.state.films} />

        {/* для обработки ошибок (error), рендер по условию. error.message = 'No matches were found! Try again!' */}
        {error && <h3 className="ErrorMessage ">{error.message}</h3>}
      </>
    );
  }
}

export default MoviesPage;
