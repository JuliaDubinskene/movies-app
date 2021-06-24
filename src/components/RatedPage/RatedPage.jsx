import React, { useEffect, useState, useContext } from 'react';
import { Alert, Result } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import Spinner from '../Spinner';
import CardList from '../CardList';

import ApiServiceContext from '../../context';

import './RatedPage.css';

const RatedPage = () => {
  const [ratedList, setRatedList] = useState({ results: null, page: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = useContext(ApiServiceContext);
  const { guestSessionId } = api;

  useEffect(() => {
    setError(false);

    api
      .getRatedMovies(guestSessionId, ratedList.page)
      .then((res) => {
        setRatedList({ results: res, page: ratedList.page });
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [api, guestSessionId, ratedList.page]);

  const onPageChanged = (ChangedPage) => {
    if (ChangedPage !== ratedList.page) {
      setRatedList({ results: ratedList.results, page: ChangedPage });
      setLoading(true);
    }
  };

  if (loading) return <Spinner />;

  if (error) return <Alert message={error.name} description={error.message} type="error" showIcon />;

  if (ratedList.results.results.length === 0) {
    return <Result icon={<StarOutlined />} title="You don't have any rated movies yet..." />;
  }

  return <CardList filmsList={ratedList.results} onPageChanged={onPageChanged} />;
};

export default RatedPage;
