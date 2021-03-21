import React, { Component, Suspense, lazy } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import routes from './routes';

// Pages
// import NotFoundPage from './pages/NotFoundPage';

// Components
import AppBar from './components/AppBar';

// Dynamic import. Chunkование. Lazy
const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "home-page" */),
);

const MoviesPage = lazy(() =>
  import('./pages/MoviesPage' /* webpackChunkName: "movies-page" */),
);

const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);
// apiKey = 'a524e22e3630cf24a2e0a24a461145a2'

class App extends Component {
  state = {
    //
  };

  // LOCAL STORAGE И ЖИЗНЕННЫЕ ЦИКЛЫ

  // МЕТОДЫ

  render() {
    return (
      <div className="App">
        {/* вставляем Component AppBar с ложенной в него Navigation */}
        <AppBar />

        <Suspense fallback={<h2>Loading...</h2>}>
          <Switch>
            {/* Home Page */}
            <Route exact path={routes.home} component={HomePage} />

            {/* Movies Page + MovieDetails Page  */}
            <Route exact path={routes.movies} component={MoviesPage} />

            <Route path={routes.movieDetails} component={MovieDetailsPage} />
            {/* Not Found Page. Для обработки ошибок, если component not found, передаем какой-либо default Route. Если не передавать path, этот путь будет рендирится везде  и всегда*/}
            {/* <Route component={NotFoundPage} /> */}

            {/* страница по умолчанию, куда перенаправить в случае, если такого адреса не имеется */}
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default App;
