import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTIONS_TYPES } from "./action-types";

export const setCurrentUser = (user) =>
  createAction(USER_ACTIONS_TYPES.SET_CURRENT_USER, user);
