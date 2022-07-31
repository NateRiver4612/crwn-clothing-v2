import { ProductMap } from './products.types';
import { createSelector } from "reselect";
import { PRODUCTS_STATE_Type } from "./products.reducer";
import { RootState } from '../store';

const shopReducer = (state:RootState):PRODUCTS_STATE_Type => state.shop;

export const selectProductsArray = createSelector(
  [shopReducer],
  (shop) => shop.products
);

export const selectProducts = createSelector(
  [selectProductsArray],
  (productsArray) =>
    productsArray.reduce((acc, product) => {
      const { title, items } = product;
      acc[title.toLowerCase()] = items;

      return acc;
    }, {} as ProductMap)
);

export const selectProductsIsLoading = createSelector(
  [shopReducer],
  (shop) => shop.isLoading
);
