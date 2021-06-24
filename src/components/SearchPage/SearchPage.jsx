import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Result } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Spinner from '../Spinner';
import CardList from '../CardList';
import FilmSearch from '../FilmSearch';

import ApiServiceContext from '../../context';

import './SearchPage.css';

import { FILM_TITLE_DEFAULT } from '../../constants';

const SearchPage = () => {
  const [filmsList, setFilmsList] = useState({ results: null, page: 1, title: FILM_TITLE_DEFAULT });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const api = useContext(ApiServiceContext);

  useEffect(() => {
    let cancelled = false;
    setError(false);

    if (filmsList.title === '') {
      setFilmsList({ results: null, page: 1, title: filmsList.title });
      setLoading(false);
    } else {
      api
        .getFilmsList(filmsList.title || FILM_TITLE_DEFAULT, filmsList.page)
        .then((res) => {
          if (!cancelled) {
            setFilmsList({ results: res, page: filmsList.page, title: filmsList.title });
          }
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return () => {
      cancelled = true;
    };
  }, [api, filmsList.title, filmsList.page]);

  const onSearch = (title) => {
    const trimTitile = title.trim();

    if (trimTitile !== filmsList.title) {
      setFilmsList({ results: filmsList.results, page: 1, title });
      setLoading(true);
    }
  };

  const onPageChanged = (ChangedPage) => {
    if (ChangedPage !== filmsList.page) {
      setFilmsList({ results: filmsList.results, page: ChangedPage, title: filmsList.title });
      setLoading(true);
    }
  };

  return (
    <SearchPageView
      filmsTitle={filmsList.title}
      filmsList={filmsList.results}
      loading={loading}
      onSearch={onSearch}
      onPageChanged={onPageChanged}
      error={error}
    />
  );
};

export default SearchPage;

const SearchPageView = ({ filmsTitle, filmsList, loading, error, onSearch, onPageChanged }) => {
  const hasFlimsList = !(loading || error || filmsList === null);
  const noResults = hasFlimsList && filmsList.total_results === 0;

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <Alert message={error.name} description={error.message} type="error" showIcon /> : null;
  const noResultsMessage = noResults ? (
    <Alert
      message="Nothing found..."
      description={`The search for the query: "${filmsTitle}" did not yield results`}
      type="info"
      showIcon
    />
  ) : null;

  const content = hasFlimsList ? <CardList filmsList={filmsList} onPageChanged={onPageChanged} /> : null;

  const emptyString =
    filmsList === null && !loading ? <Result icon={<SearchOutlined />} title="Start typing to search..." /> : null;

  return (
    <>
      <FilmSearch onSearch={onSearch} />

      {errorMessage}
      {spinner}
      {noResultsMessage}
      {content}
      {emptyString}
    </>
  );
};

SearchPageView.defaultProps = {
  filmsTitle: '',
  filmsList: null,
  loading: false,
  error: false,
  onSearch: () => {},
  onPageChanged: () => {},
};

SearchPageView.propTypes = {
  filmsTitle: PropTypes.string,
  filmsList: PropTypes.shape({
    page: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
    total_pages: PropTypes.number,
    total_results: PropTypes.number,
  }),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onSearch: PropTypes.func,
  onPageChanged: PropTypes.func,
};
