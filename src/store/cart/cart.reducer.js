import { CART_ACTION_TYPES } from "./cart.types";

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  error: null,
};

export const CartReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPES.CHECK_OUT_CART_SUCCESS:
      return {
        ...state,
        cartItems: [],
        error: null,
      };
    case CART_ACTION_TYPES.CHECK_OUT_CART_FAILED:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
