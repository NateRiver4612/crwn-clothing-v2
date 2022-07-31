import PRODUCTS_ACTION_TYPES,{ProductItemType, ProductsType } from "./products.types";
import { createAction, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { withMatcher } from "../../utils/reducer/reducer.utils";


//Define action types 
export type SetProductsStart_ActionType = Action<PRODUCTS_ACTION_TYPES.SET_PRODUCTS_START> 

export type SetProductsSuccess_ActionType = ActionWithPayload<PRODUCTS_ACTION_TYPES.SET_PRODUCTS_SUCCESS, ProductsType[]>

export type SetProductsFailed_ActionType = ActionWithPayload<PRODUCTS_ACTION_TYPES.SET_PRODUCTS_FAILED, Error>

//Define type union 
// export type Product_ActionsType = SetProductsStart_ActionType | SetProductsSuccess_ActionType | SetProductsFailed_ActionType

export const setProductsStart = withMatcher((): SetProductsStart_ActionType =>
  createAction(PRODUCTS_ACTION_TYPES.SET_PRODUCTS_START));


export const setProductsSuccess = withMatcher((data: ProductsType[]): SetProductsSuccess_ActionType =>
  createAction(PRODUCTS_ACTION_TYPES.SET_PRODUCTS_SUCCESS, data));

export const setProductsFailed = withMatcher((error: Error): SetProductsFailed_ActionType =>
  createAction(PRODUCTS_ACTION_TYPES.SET_PRODUCTS_FAILED, error));
