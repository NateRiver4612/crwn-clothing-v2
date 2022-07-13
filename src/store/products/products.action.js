import PRODUCTS_ACTION_TYPES from "./products.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setProducts = (data) =>
  createAction(PRODUCTS_ACTION_TYPES.SET_PRODUCTS, data);
