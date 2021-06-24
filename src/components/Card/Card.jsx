import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
import GenreTags from '../GenreTags';

import ApiServiceContext from '../../context';

import noPhoto from '../pictures/noPhoto.png';
import './Card.css';

const Card = ({ title, release, genresNamesList, overview, banner, avergeRating, id }) => {
  const api = useContext(ApiServiceContext);
  const { appRatedList } = api;

  const getUserFilmRate = () => (appRatedList.has(id) ? appRatedList.get(id) : 0);

  const getMinifyText = (text, length) => {
    if (text.length > length) return `${text.slice(0, text.indexOf(' ', length))}...`;
    return text;
  };

  const changeRating = (rate) => {
    if (rate !== appRatedList.get(id)) {
      api.updateAppRatedList(id, rate);
      api.onRatedMovie(id, rate, api.guestSessionId);
    }
  };

  const getBorderColor = () => {
    if (avergeRating < 3) return '#E90000';
    if (avergeRating < 5) return '#E97E00';
    if (avergeRating < 7) return '#E9D100';
    return '#66E900';
  };

  const getBanner = () => (banner ? `https://image.tmdb.org/t/p/original${banner}` : noPhoto);

  return (
    <div className="card">
      <img className="card__image" src={getBanner()} alt="film banner" />
      <div className="card__info">
        <div className="card__header">
          <h2 className="card__title">{title}</h2>
          <div className="card__averge-rating" style={{ border: `2px solid ${getBorderColor()}` }}>
            {avergeRating}
          </div>
        </div>
        <div className="card__release-date">
          {new Date(release).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        <GenreTags genresNamesList={genresNamesList} />
        <p className="card__overview overflow-multiply">{getMinifyText(overview, 100)}</p>
        <Rate
          className="card__user-rating"
          allowClear={false}
          allowHalf
          defaultValue={getUserFilmRate()}
          onChange={(val) => changeRating(val)}
          count={10}
        />
      </div>
    </div>
  );
};

Card.defaultProps = {
  banner: '',
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  release: PropTypes.string.isRequired,
  genresNamesList: PropTypes.arrayOf(Object).isRequired,
  overview: PropTypes.string.isRequired,
  banner: PropTypes.string,
  avergeRating: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default Card;
