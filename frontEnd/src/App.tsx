import * as React from 'react';
import { Component, useState, useEffect, useReducer, useContext } from 'react';
import * as BrowserHistory from 'history';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
// import './App.css';
import Home from './pages/Home';
import GlobalStateContainer from './context/GlobalStateContainer';
import Login from './pages/Login';
import NotFound from './pages/404';

import { BASE_URL_PATH } from './utils/core';

const browserHistory = BrowserHistory.createBrowserHistory();
const App = function() {
  return (
    <Router basename={BASE_URL_PATH} {...browserHistory}>
      <GlobalStateContainer history={browserHistory}>
        <div style={{ height: '100%' }}>
          <Switch>
            <Route path="/login" render={(props) => <Login {...props} />} />
            <Route path="/" render={(props) => <Home {...props} />} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </GlobalStateContainer>
    </Router>
  );
};

export default App;
