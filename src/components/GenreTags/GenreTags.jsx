import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

import './GenreTags.css';

const GenresTags = ({ genresNamesList }) => {
  if (genresNamesList) {
    const tagsList = genresNamesList.map((genre) => (
      <Tag key={genre.id} className="card__genre-tag">
        <a href="#">{genre.name}</a>
      </Tag>
    ));

    return <div className="card__genre-tag-list">{tagsList}</div>;
  }

  return null;
};

GenresTags.propTypes = {
  genresNamesList: PropTypes.arrayOf(Object).isRequired,
};

export default GenresTags;
