import { AnyAction } from 'redux';
import {  CartItemType } from "./cart.types";
import { SetCartOpen_Function, SetItems_Function } from './cart.action';

export type CART_STATE_TYPE = {
  readonly isCartOpen: boolean,
  readonly cartItems: CartItemType[],
  readonly error: Error | null
}

const CART_INITIAL_STATE: CART_STATE_TYPE = {
  isCartOpen: false,
  cartItems: [],
  error: null,
};



export const CartReducer = (state = CART_INITIAL_STATE, action: AnyAction):CART_STATE_TYPE => {

  if(SetItems_Function.match(action)){
    return {
        ...state,
        cartItems: action.payload,
      };
  }
  if(SetCartOpen_Function.match(action)){
    return {
        ...state,
        isCartOpen: action.payload,
      };
  }
  return state;
};
