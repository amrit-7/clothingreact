import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";
//---ADDING ITEMS---//
const addCartItem = (cartItems, productsToAdd) => {
  //find item
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === productsToAdd.id
  );
  //if yes increase
  if (existingItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productsToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  //return modified array
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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  deleteItemTpCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});
const INITIAL_STATE = {
  isCartOpen: false,
  cartCount: 0,
  cartTotal: 0,
  cartItems: [],
};

const CART_ACTION_TYPES = {
  SETCARTITEMS: "SET_CART_ITEMS",
  SETISCARTOPEN: "SET_IS_CART_OPEN",
};
export const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SETCARTITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SETISCARTOPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = cartItems.reduce(
      (accumulated, currentElement) => accumulated + currentElement.quantity,
      0
    );
    const newCartTotal = cartItems.reduce(
      (accumulated, currentElement) =>
        accumulated + currentElement.quantity * currentElement.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SETCARTITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };

  const addItemToCart = (productsToAdd) => {
    const newCartItems = addCartItem(cartItems, productsToAdd);
    updateCartItemsReducer(newCartItems);
  };
  const removeItemToCart = (cartItemtoRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemtoRemove);
    updateCartItemsReducer(newCartItems);
  };
  const deleteItemToCart = (cartItemtoRemove) => {
    const newCartItems = clearCartItem(cartItems, cartItemtoRemove);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (boolean) => {
    dispatch(createAction(CART_ACTION_TYPES.SETISCARTOPEN, boolean));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    deleteItemToCart,
    cartItems,
    cartCount,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
