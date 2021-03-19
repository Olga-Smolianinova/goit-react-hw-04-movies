import React from 'react';

import { NavLink } from 'react-router-dom';

import routes from '../../routes';

import './Navigation.scss';

const Navigation = () => {
  return (
    <nav className="navbar navbar-light">
      <NavLink
        exact
        to={routes.home}
        className="nav-link"
        activeClassName="active"
      >
        Home
      </NavLink>
      <NavLink to={routes.movies} className="nav-link" activeClassName="active">
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
