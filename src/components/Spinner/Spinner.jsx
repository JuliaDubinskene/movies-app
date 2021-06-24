import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './Spinner.css';

const Spinner = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 150 }} spin />;
  return <Spin indicator={antIcon} className="spinner" />;
};

export default Spinner;
