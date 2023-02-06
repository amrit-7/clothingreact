import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";
//---ADDING ITEMS---//
const addCartItem = (cartItems, productsToAdd) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === productsToAdd.id
  );
  if (existingItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productsToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productsToAdd, quantity: 1 }];
};
//---REMOVE ITEMS---///
const removeCartItem = (cartItems, cartItemtoRemove) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemtoRemove.id
  );
  if (existingItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemtoRemove.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemtoRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
const clearCartItem = (cartItems, cartItemToDelete) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToDelete.id);
};

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SETISCARTOPEN, boolean);

export const addItemToCart = (cartItems, productsToAdd) => {
  const newCartItems = addCartItem(cartItems, productsToAdd);
  return createAction(CART_ACTION_TYPES.SETCARTITEMS, newCartItems);
};
export const removeItemToCart = (cartItems, cartItemtoRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemtoRemove);
  return createAction(CART_ACTION_TYPES.SETCARTITEMS, newCartItems);
};
export const deleteItemToCart = (cartItems, cartItemtoRemove) => {
  const newCartItems = clearCartItem(cartItems, cartItemtoRemove);
  return createAction(CART_ACTION_TYPES.SETCARTITEMS, newCartItems);
};
