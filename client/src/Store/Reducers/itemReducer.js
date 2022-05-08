import { v1 as uuid } from 'uuid';
import {
  ADD_ITEM,
  ADD_PLAYER,
  DELETE_ITEM,
  DELETE_PLAYER,
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
    case ADD_PLAYER:
      return {
        ...state,
        item: state.item.map((e) =>
          e._id === action.payload.id
            ? {
                ...e,
                players: [...e.players, action.payload.player],
              }
            : e
        ),
      };

    case DELETE_PLAYER:
      const newItem = state.item.map((team) =>
        team.name === action.payload.teamName
          ? {
              ...team,
              players: [
                team.players.filter(
                  (player) => player.name !== action.payload.playerName
                ),
              ][0],
            }
          : team
      );
      return {
        ...state,
        item: newItem,
      };

    default:
      return state;
  }
};
