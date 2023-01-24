import { createContext, useEffect, useState } from "react";

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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (accumulated, currentElement) => accumulated + currentElement.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (accumulated, currentElement) =>
        accumulated + currentElement.quantity * currentElement.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productsToAdd) => {
    setCartItems(addCartItem(cartItems, productsToAdd));
  };
  const removeItemToCart = (cartItemtoRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemtoRemove));
  };
  const deleteItemToCart = (cartItemtoRemove) => {
    setCartItems(clearCartItem(cartItems, cartItemtoRemove));
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
