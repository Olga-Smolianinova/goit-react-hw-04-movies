import React, { Component } from 'react';

import PropTypes from 'prop-types';

import moviesApi from '../../api/movies-api'; //import файла, который прописывает логику настроек Api для http-запросов

class Reviews extends Component {
  state = {
    reviews: [],
    error: null,
  };

  // ЖИЗНЕННЫЕ ЦИКЛЫ
  async componentDidMount() {
    // выносим в отдельную переменную movieId - значение this.props.match.params.movieId
    const movieId = this.props.match.params.movieId;

    // Previews. Http-запрос об информация об обзорах для страницы MovieDetailsPage
    await moviesApi
      .fetchReviews(movieId)
      .then(({ results }) => {
        // console.log(results);

        //  условие, если массив данных  пустой
        if (results.length === 0) {
          throw new Error('We don`t have any reviews for this movie');
        }

        this.setState({
          reviews: [...results],
        });
      })
      .catch(error => this.setState({ error }));
  }

  render() {
    const { reviews, error } = this.state;

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

        {/* для обработки ошибок (error), рендер по условию. error.message = 'We don`t have any reviews for this movie' */}
        {error && <h3 className="ErrorMessage">{error.message}</h3>}
      </>
    );
  }
}

Reviews.propTypes = {
  movieId: PropTypes.string,
};

export default Reviews;
