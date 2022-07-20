import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const addCartItemHelper = (cartItems, itemToAdd) => {
  //check if item is existed
  const itemExisted = cartItems.find((item) => itemToAdd.id === item.id);

  if (itemExisted) {
    //return new array with Increase quantity of itemToAdd
    return cartItems.map((item) =>
      item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

const removeCartItemHelper = (cartItems, itemToRemove) => {
  //check if item is existed
  const itemExisted = cartItems.find((item) => itemToRemove.id === item.id);

  //check if quanity of item is equal to 1 then we remove it from  cartItems
  if (itemExisted.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
  }

  return cartItems.map((item) =>
    item.id === itemToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

const clearCartItemHelper = (cartItems, itemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== itemToClear.id);
};

export const addItemToCartContext = (cartItems, item) => {
  const newCartItems = addCartItemHelper(cartItems, item);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCartContext = (cartItems, item) => {
  const newCartItems = removeCartItemHelper(cartItems, item);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCartContext = (cartItems, item) => {
  const newCartItems = clearCartItemHelper(cartItems, item);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setCartOpen = (isOpen) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen);
};
