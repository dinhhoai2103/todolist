import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_TASK_LIST,
  GET_TASK_LIST_SUCCESS,
  GET_TASK_LIST_FAIL,
  GET_COMPLETE_LIST,
  GET_COMPLETE_LIST_SUCCESS,
  GET_COMPLETE_LIST_FAIL,
  CREATE_TASK,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAIL,
  EDIT_TASK,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_FAIL,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  COMPLETE_TASK,
  COMPLETE_TASK_SUCCESS,
  COMPLETE_TASK_FAIL,
  DELETE_COMPLETE_TASK,
  DELETE_COMPLETE_TASK_SUCCESS,
  DELETE_COMPLETE_TASK_FAIL
} from '../constants';

function* getTaskListSaga(){
  try {
    const response = yield axios.get(`http://localhost:3001/todolist`);
    const data = response.data;
    yield put({
      type: GET_TASK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_TASK_LIST_FAIL,
      payload: error,
    });
  }
}
function* getCompleteListSaga(){
  try {
    const response = yield axios.get(`http://localhost:3001/completeList`);
    const data = response.data;
    yield put({
      type: GET_COMPLETE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_COMPLETE_LIST_FAIL,
      payload: error,
    });
  }
}

function* createTaskSaga(action){
  try {
    const response = yield axios.post(`http://localhost:3001/todolist`, action.payload);
    const data = response.data;
    yield put({
      type: CREATE_TASK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: CREATE_TASK_FAIL,
      payload: error,
    });
  }
}

function* editTaskListSaga(action){
  try {
    const { id, title, description } = action.payload
    const response = yield axios.put(`http://localhost:3001/todolist/${id}`, { title, description } );
    const data = response.data;
    yield put({
      type: EDIT_TASK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: EDIT_TASK_FAIL,
      payload: error,
    });
  }
}

function* deleteTaskListSaga(action){
  try {
    const { id } = action.payload
    yield axios.delete(`http://localhost:3001/todolist/${id}`);
    yield put({
      type: DELETE_TASK_SUCCESS,
      payload: { id },
    });
  } catch (error) {
    yield put({
      type: DELETE_TASK_FAIL,
      payload: error,
    });
  }
}

function* completeTaskListSaga(action){
  try {
    const response = yield axios.post(`http://localhost:3001/completeList/`, action.payload.completeItem);
    const data = response.data
    yield put({
      type: COMPLETE_TASK_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: COMPLETE_TASK_FAIL,
      payload: error,
    });
  }
}

function* deleteCompleteTaskSaga(action){
  try {
    const { id } = action.payload
    yield axios.delete(`http://localhost:3001/completeList/${id}`);
    yield put({
      type: DELETE_COMPLETE_TASK_SUCCESS,
      payload: { id },
    });
  } catch (error) {
    yield put({
      type: DELETE_COMPLETE_TASK_FAIL,
      payload: error,
    });
  }
}


export default function* todoListSaga(){
  yield takeEvery(GET_TASK_LIST, getTaskListSaga);
  yield takeEvery(GET_COMPLETE_LIST, getCompleteListSaga);
  yield takeEvery(CREATE_TASK, createTaskSaga);
  yield takeEvery(EDIT_TASK, editTaskListSaga);
  yield takeEvery(DELETE_TASK, deleteTaskListSaga);
  yield takeEvery(COMPLETE_TASK, completeTaskListSaga);
  yield takeEvery(DELETE_COMPLETE_TASK, deleteCompleteTaskSaga);
  
}
