import { CLEAR_ERRORS, GET_ERRORS } from './actions';

export const returnErrors = (msg, status, id) => {
  console.log(msg);
  return {
    type: GET_ERRORS,
    payload: { msg, status, id },
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
