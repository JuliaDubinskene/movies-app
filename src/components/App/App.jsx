import React, { useState, useEffect, useMemo } from 'react';
import ApiService from '../ApiService';
import ApiServiceContext from '../../context';

import PageRouter from '../PageRouter';

import 'antd/dist/antd.css';
import './App.css';

const App = () => {
  const api = useMemo(() => new ApiService(), []);

  const [guestSessionId, setGuestSessionId] = useState(null);
  const [appRatedList, setAppRatedList] = useState(new Map());

  useEffect(() => {
    api.getGuestSession().then((id) => {
      setGuestSessionId(id);
    });
  }, [api]);

  const updateAppRatedList = (id, rate) => {
    const newList = new Map(appRatedList.entries());
    newList.set(id, rate);

    setAppRatedList(newList);
  };

  return (
    <div className="content">
      <ApiServiceContext.Provider value={{ ...api, guestSessionId, appRatedList, updateAppRatedList }}>
        <PageRouter />
      </ApiServiceContext.Provider>
    </div>
  );
};

export default App;
