import { v1 as uuid } from 'uuid';
import {
  ADD_ITEM,
  DELETE_ITEM,
  GET_ITEMS,
  ITEMS_LOADING,
} from '../Actions/actions';

const initialState = {
  item: [],
  loading: false,
  errorMessage: null,
};

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return { ...state, item: action.payload, loading: false };
    case ADD_ITEM:
      return { ...state, item: [...state.item, action.payload] };

    case DELETE_ITEM:
      return {
        ...state,
        item: [...state.item].filter((item) => item._id !== action.payload),
        // lastUpdated: Date.now(),
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
        // lastUpdated: Date.now(),
      };

    default:
      return state;
  }
};
