import axios from 'axios';
import { useCallback } from 'react';
import {
  ADD_ITEM,
  ADD_PLAYER,
  DELETE_ITEM,
  DELETE_PLAYER,
  GET_ERRORS,
  GET_ITEMS,
  ITEMS_LOADING,
} from './actions';
import { tokenConfig } from './AuthActions';
import { returnErrors } from './ErrActions';

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios.get('/api/items').then((res) =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    })
  );
};

export const addItems = (input) => (dispatch, getState) => {
  axios
    .post('/api/items/createTeam', input, tokenConfig(getState))
    // .then((res) =>
    //   dispatch({
    //     type: ADD_ITEM,
    //     payload: res.data,
    //   })
    // )
    .catch((err) =>
      dispatch(
        returnErrors(err.response.data, err.response.status, 'GET_ERRORS')
      )
    );
};

export const deleteItem = (id) => (dispatch, getState) => {
  console.log(id);
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    // .then((res) =>
    //   dispatch({
    //     type: DELETE_ITEM,
    //     payload: id,
    //   })
    // )
    .catch((err) =>
      dispatch(
        returnErrors(err.response.data, err.response.status, 'GET_ERRORS')
      )
    );
};

export const addPlayer = (id, player) => (dispatch, getState) => {
  axios
    .post(`/api/items/addPlayer/${id}`, player, tokenConfig(getState))
    .then((res) => {
      const newPlayer = res.data.players.slice(-1)[0];
      dispatch({
        type: ADD_PLAYER,
        payload: { id, player: newPlayer },
      });
    });
  // .catch((err) =>
  //   dispatch(
  //     returnErrors(err.response.data, err.response.status, 'GET_ERRORS')
  //   )
  // );
};

export const deletePlayer = (willDelete) => (dispatch, getState) => {
  axios
    .post(`/api/items/deletePlayer/`, willDelete, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_PLAYER,
        payload: willDelete,
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(err.response.data, err.response.status, 'GET_ERRORS')
      )
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
