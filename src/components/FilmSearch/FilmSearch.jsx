import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import debounce from 'lodash.debounce';

import './FilmSearch.css';

const FilmSearch = ({ onSearch }) => {
  const onSeartchInputChange = (title) => {
    onSearch(title);
  };

  return (
    <Input placeholder="Type to search..." onChange={debounce((evt) => onSeartchInputChange(evt.target.value), 2000)} />
  );
};

FilmSearch.defaultProps = {
  onSearch: () => {},
};

FilmSearch.propTypes = {
  onSearch: PropTypes.func,
};

export default FilmSearch;
