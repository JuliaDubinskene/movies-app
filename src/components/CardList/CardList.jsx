import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import FilmPagination from '../FilmPagination';

import ApiServiceContext from '../../context';

import './CardList.css';

const CardList = ({ filmsList, onPageChanged }) => {
  const api = useContext(ApiServiceContext);
  const { fullGenresList } = api;

  const getGenresNamesList = (film, arr) =>
    film.genre_ids.reduce((acc, val) => {
      const obj = arr.find((item) => item.id === val);
      acc.push(obj);
      return acc;
    }, []);

  if (!filmsList) return 'Нет результатов';

  const cardList = filmsList.results.map((film) => (
    <Card
      key={film.id}
      title={film.title}
      banner={film.poster_path}
      release={film.release_date}
      avergeRating={film.vote_average}
      id={film.id}
      genresNamesList={getGenresNamesList(film, fullGenresList)}
      overview={film.overview}
    />
  ));

  return (
    <>
      <section className="card-list">{cardList}</section>
      <FilmPagination page={filmsList.page} total={filmsList.total_results} onPageChanged={onPageChanged} />
    </>
  );
};

CardList.defaultProps = {
  filmsList: {},
  onPageChanged: () => {},
};

CardList.propTypes = {
  filmsList: PropTypes.objectOf(PropTypes.any),
  onPageChanged: PropTypes.func,
};

export default CardList;
