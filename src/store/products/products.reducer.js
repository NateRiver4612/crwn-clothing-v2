import PRODUCTS_ACTION_TYPES from "./products.types";

const INITIAL_STATE = {
  products: [],
};

export const ProductsReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCTS_ACTION_TYPES.SET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    default:
      return state;
  }
};
