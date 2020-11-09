import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Switch } from 'react-router-dom'
import { createStore, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import DefaultLayout from './layout/DefaultLayout'

import TodoList from './pages/TodoList'

import history from './util/history'


import myReducer from './redux/reducers/index'
import mySaga from './redux/sagas'

import * as serviceWorker from './serviceWorker'

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(myReducer, applyMiddleware(...[sagaMiddleware, logger]))
sagaMiddleware.run(mySaga)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router  history={history}>
        <Switch>
          <DefaultLayout exact path="/" component={TodoList}/>
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
