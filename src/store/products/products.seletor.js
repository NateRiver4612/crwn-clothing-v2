import { createSelector } from "reselect";

const shopReducer = (state) => state.shop;

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
    }, {})
);

export const selectProductsIsLoading = createSelector(
  [shopReducer],
  (shop) => shop.isLoading
);
