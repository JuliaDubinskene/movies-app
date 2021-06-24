import React, { useContext, useEffect, useState } from 'react';
import { Alert, Menu } from 'antd';
import PropTypes from 'prop-types';
import ApiServiceContext from '../../context';
import Spinner from '../Spinner';

import SearchPage from '../SearchPage';
import RatedPage from '../RatedPage';

import { ROUTE_DEFAULT } from '../../constants';

import './PageRouter.css';

const PageRouter = () => {
  const [fullGenresList, setFullGenresList] = useState(null);
  const [route, setRoute] = useState(ROUTE_DEFAULT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const api = useContext(ApiServiceContext);

  useEffect(() => {
    api
      .getFullGenresList()
      .then((res) => {
        setFullGenresList(res.genres);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [api]);

  const changeRoute = (newRoute) => {
    setRoute(newRoute);
  };

  if (loading) return <Spinner />;

  if (error) return <Alert message={error.name} description={error.message} type="error" showIcon />;

  return (
    <ApiServiceContext.Provider value={{ ...api, fullGenresList }}>
      <PageRouterView route={route} changeRoute={changeRoute} />
    </ApiServiceContext.Provider>
  );
};

const PageRouterView = ({ route, changeRoute }) => {
  const getRoutedPage = () => {
    switch (route) {
      case 'search':
        return <SearchPage />;

      case 'rated':
        return <RatedPage />;

      default:
        return false;
    }
  };

  const routedPage = getRoutedPage();

  return (
    <>
      <Menu defaultSelectedKeys={route} onClick={(val) => changeRoute(val.key)} mode="horizontal">
        <Menu.Item key="search">Search</Menu.Item>
        <Menu.Item key="rated">Rated</Menu.Item>
      </Menu>

      {routedPage}
    </>
  );
};

PageRouterView.defaultProps = {
  changeRoute: () => {},
};

PageRouterView.propTypes = {
  route: PropTypes.string.isRequired,
  changeRoute: PropTypes.func,
};

export default PageRouter;
