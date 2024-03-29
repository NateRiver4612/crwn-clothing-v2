import { ProductItemType } from "../products/products.types";

export enum CART_ACTION_TYPES  {
  SET_IS_CART_OPEN =  "SET_IS_CART_OPEN",
  SET_CART_ITEMS =  "SET_CART_ITEMS",
  SET_CART_COUNT =  "SET_CART_COUNT",
  SET_CART_TOTAL = "SET_CART_TOTAL",
  CHECK_OUT_CART_START =  "CHECK_OUT_CART_START",
  CHECK_OUT_CART_SUCCESS =  "CHECK_OUT_CART_SUCCESS",
  CHECK_OUT_CART_FAILED =  "CHECK_OUT_CART_FAILED",
};

export type CartItemType = ProductItemType & {
  quantity: number 
}