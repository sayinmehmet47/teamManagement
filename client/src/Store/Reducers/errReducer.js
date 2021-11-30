import { GET_ERRORS, CLEAR_ERRORS } from '../Actions/actions';

const initialState = {
  msj: {},
  status: null,
  id: null,
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msj: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_ERRORS:
      return { msj: {}, status: null, id: null };

    default:
      return state;
  }
};
