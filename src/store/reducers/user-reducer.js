import { USER_ACTIONS_TYPES } from "../action/action-types";
const INITIAL = {
  currentUser: null,
};

export const userReducer = (state = INITIAL, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTIONS_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      return state;
  }
};
