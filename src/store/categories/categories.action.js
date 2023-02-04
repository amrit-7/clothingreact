import { CATEGORIES_ACTION_TYPES } from "./categories.types";
import { createAction } from "../../utils/reducer/reducer.utils";
export const setCategoriesMap = (category) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, category);
