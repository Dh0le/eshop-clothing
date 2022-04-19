import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // we always create a new array
  // find if cartItems already contain product to Add\
  const exsitingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // if found increment quantity
  if (exsitingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // else return new  array with modified items.
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const decreseCartItem = (cartItems, productToDecrease) => {
  // we always create a new array
  // find if cartItems already contain product to decrease
  const targetItem = cartItems.find((cartItem) => {
    if (cartItem.id === productToDecrease.id) {
      return cartItem.quantity;
    }
  });
  const curQuantity = targetItem.quantity;

  if (curQuantity === 1) {
    return removeItem(cartItems, productToDecrease);
  }
  // else return new  array with modified items.
  return cartItems.map((cartItem) =>
    cartItem.id === productToDecrease.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const removeItem = (cartItems, productToRemove) => {
  // we can only remove items from existing cart
  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  setCartCount: () => {},
  removeItemFromCart: () => {},
  cartTotal: 0,
  getCartTotal: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (accumulator, currentItem) => accumulator + currentItem.quantity,
      0
    );
    setCartCount(newCartCount);
    const newCartTotal = cartItems.reduce(
      (accumulator, currentItem) =>
        accumulator + currentItem.quantity * currentItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const decreaseItemFromCart = (productToDecrease) => {
    setCartItems(decreseCartItem(cartItems, productToDecrease));
  };
  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeItem(cartItems, productToRemove));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    decreaseItemFromCart,
    removeItemFromCart,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
