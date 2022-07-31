import { createSelector } from "reselect";
import { CART_STATE_TYPE } from "./cart.reducer";
import { RootState } from "../store";

const cartReducer = (state:RootState):CART_STATE_TYPE => state.cart;

export const selectIsCartOpen = createSelector(
  [cartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartItems = createSelector(
  [cartReducer],
  (cart) => cart.cartItems
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, item) => item.quantity + total, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
);
