import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './SearchForm.scss';

class SearchForm extends Component {
  state = {
    query: '',
  };

  // МЕТОДЫ
  handleChange = event => {
    this.setState({
      query: event.currentTarget.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    //  передача  props onSubmit из MoviesPAge.js для обработки действий когда будет изменяться query
    this.props.onSubmit(this.state.query);

    //   обновление input
    this.setState({
      query: '',
    });
  };

  render() {
    return (
      <div className="Search">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            value={this.state.query}
            onChange={this.handleChange}
          />

          <button type="submit" className="Search-button">
            Search
          </button>
        </form>
      </div>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
