import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";
export const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      //console.log("Updating cartItems");
      //console.log(pay )
      return { ...state, cartItems: payload };

    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    default:
      return state;
  }
};

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

// actual action functions
export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const decreaseItemFromCart = (cartItems, productToDecrease) => {
  const newCartItems = decreseCartItem(cartItems, productToDecrease);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
