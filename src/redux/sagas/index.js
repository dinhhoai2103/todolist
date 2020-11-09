import { fork } from 'redux-saga/effects';

import todoListSaga from './todoList.saga'

export default function* mySaga(){
  yield fork(todoListSaga);
}
