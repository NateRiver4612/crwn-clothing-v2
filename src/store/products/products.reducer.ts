import { AnyAction } from 'redux';
import  { ProductsType } from "./products.types";
import {setProductsStart, setProductsSuccess, setProductsFailed} from './products.action'


export type  PRODUCTS_STATE_Type = {
  readonly products: ProductsType[],
  readonly isLoading: boolean ,
  readonly error: Error | null,
}

export const PRODUCTS_INITIAL_STATE: PRODUCTS_STATE_Type = {
  products: [],
  isLoading: false,
  error: null,
};

export const ProductsReducer = (state = PRODUCTS_INITIAL_STATE, action: AnyAction): PRODUCTS_STATE_Type=> {
  if(setProductsStart.match(action)){
    return {
        ...state,
        isLoading: true,
      };
  }
  if(setProductsSuccess.match(action)){
    return {
        ...state,
        products: action.payload,
        isLoading: false,
      };
  }
  if(setProductsFailed.match(action)){
     return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
  }
  return state
};
