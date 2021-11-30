import axios from 'axios';
import {
  ADD_ITEM,
  DELETE_ITEM,
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
    .post('/api/items', input, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    )
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
    .then((res) =>
      dispatch({
        type: DELETE_ITEM,
        payload: id,
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
