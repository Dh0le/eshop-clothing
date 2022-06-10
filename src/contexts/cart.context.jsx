import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

// basic reducer
const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };

    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  // initilize the values
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  // function to update cartitem reducer
  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (accumulator, currentItem) => accumulator + currentItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (accumulator, currentItem) =>
        accumulator + currentItem.quantity * currentItem.price,
      0
    );
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  // actual action functions
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };
  const decreaseItemFromCart = (productToDecrease) => {
    const newCartItems = decreseCartItem(cartItems, productToDecrease);
    updateCartItemsReducer(newCartItems);
  };
  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  // output value
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
