import { combineReducers } from "redux";
import { userReducer } from "../reducers/user-reducer";
import { CategoriesReducer } from "../categories/category.reducer";
import { cartReducer } from "../cart/cart.reducer";
export const rootReducer = combineReducers({
  user: userReducer,
  categories: CategoriesReducer,
  cart: cartReducer,
});
