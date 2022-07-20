import PRODUCTS_ACTION_TYPES from "./products.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setProductsStart = () =>
  createAction(PRODUCTS_ACTION_TYPES.SET_PRODUCTS_START);

export const setProductsSuccess = (data) =>
  createAction(PRODUCTS_ACTION_TYPES.SET_PRODUCTS_SUCCESS, data);

export const setProductsFailed = (error) =>
  createAction(PRODUCTS_ACTION_TYPES.SET_PRODUCTS_FAILED, error);
