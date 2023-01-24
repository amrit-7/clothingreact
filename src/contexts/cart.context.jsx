import { createContext, useEffect, useState } from "react";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (accumulated, currentElement) => accumulated + currentElement.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productsToAdd) => {
    setCartItems(addCartItem(cartItems, productsToAdd));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
