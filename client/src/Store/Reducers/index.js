import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { errorReducer } from './errReducer';
import { itemReducer } from './itemReducer';

export default combineReducers({
  items: itemReducer,
  auth: authReducer,
  err: errorReducer,
});
