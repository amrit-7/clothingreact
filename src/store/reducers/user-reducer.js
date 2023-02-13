import { USER_ACTIONS_TYPES } from "../action/action-types";
const INITIAL = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTIONS_TYPES.SIGN_IN_SUCCESS:
      return { ...state, currentUser: payload };
    case USER_ACTIONS_TYPES.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null };
    case USER_ACTIONS_TYPES.SIGN_UP_FAILED:
    case USER_ACTIONS_TYPES.SIGN_OUT_FAILED:
    case USER_ACTIONS_TYPES.SIGN_IN_FAILED:
      return { ...state, error: payload };
    default:
      return state;
  }
};
