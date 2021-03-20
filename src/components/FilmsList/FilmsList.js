import React from 'react';

import { Link, withRouter } from 'react-router-dom'; //Link - Для того чтобы при клике на film перенаправляло на новую страницу с информацией о нем; withRouter - компонент высшего порядка (грубо говоря - это как композиция функций), который может оборачивать исходный компонент, и возвращать другой компонент. Если необходимо в каком-либо компонент, который не рендерится Route, получить доступ к 3 props (match, history, location)

// import axios from 'axios';

const FilmsList = ({ films, location }) => {
  return (
    <>
      <h2>Tranding today:</h2>

      {/* ul */}

      {films.map(({ id, title }) => (
        <li key={id}>
          {/*  Для того чтобы при клике на film перенаправляло на новую страницу с информацией о нем. Создаем  Link с путем, где храним информацию как текущий Route совпал с pathname) и id, и pathname которого передаем ссылку на Movie Details Page*/}
          <Link
            to={{
              pathname: `/movies/${id}`,

              // в state можно передавать информацию, откуда ты пришел на эту страницу
              state: { from: location },
            }}
          >
            {title}
          </Link>
        </li>
      ))}
    </>
  );
};

export default withRouter(FilmsList);
