import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItemType } from "./cart.types";
import { ProductItemType } from "../products/products.types";
import { Action, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils";

const addCartItemHelper = (cartItems: CartItemType[], itemToAdd:ProductItemType): CartItemType[] => {
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

const removeCartItemHelper = (cartItems: CartItemType[], itemToRemove: CartItemType): CartItemType[] => { 
  //check if item is existed
  const itemExisted = cartItems.find((item) => itemToRemove.id === item.id);

  //check if quanity of item is equal to 1 then we remove it from  cartItems
  if (itemExisted && itemExisted.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
  }

  return cartItems.map((item) =>
    item.id === itemToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

const clearCartItemHelper = (cartItems: CartItemType[], itemToClear:CartItemType ) : CartItemType[] => {
  return cartItems.filter((cartItem) => cartItem.id !== itemToClear.id);
};

//Define return-types and apply withMatchable  for action-creator function
export type SetItemsToCart_ActionType = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItemType[]>

export type SetCartOpen_ActionType = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>

export const SetItems_Function = withMatcher((cartItems: CartItemType[]):SetItemsToCart_ActionType=>{
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
})

export const SetCartOpen_Function = withMatcher((isOpen: boolean):SetCartOpen_ActionType=>{
 return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen);
}) 

export const addItemToCartContext = (cartItems: CartItemType[], item:ProductItemType) => {
  const newCartItems = addCartItemHelper(cartItems, item);

  return SetItems_Function(newCartItems)
};

export const removeItemFromCartContext = (cartItems: CartItemType[], item: CartItemType) => {
  const newCartItems = removeCartItemHelper(cartItems, item);

  return SetItems_Function(newCartItems)
};

export const clearItemFromCartContext = (cartItems: CartItemType[], item: CartItemType) => {
  const newCartItems = clearCartItemHelper(cartItems, item);

  return SetItems_Function(newCartItems)
};

export const setCartOpen = (isOpen: boolean): SetCartOpen_ActionType => {
  return SetCartOpen_Function(isOpen)
};

