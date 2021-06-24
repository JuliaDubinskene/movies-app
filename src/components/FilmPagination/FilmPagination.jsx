import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

import './FilmPagination.css';

const FilmPagination = ({ page, total, onPageChanged }) => (
  <Pagination
    current={page}
    onChange={(ChangedPage) => onPageChanged(ChangedPage)}
    size="small"
    total={total}
    hideOnSinglePage
    showSizeChanger={false}
    pageSize={20}
  />
);

FilmPagination.defaultProps = {
  page: 1,
  total: 0,
  onPageChanged: () => {},
};

FilmPagination.propTypes = {
  page: PropTypes.number,
  total: PropTypes.number,
  onPageChanged: PropTypes.func,
};

export default FilmPagination;
