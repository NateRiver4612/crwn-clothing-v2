import PRODUCTS_ACTION_TYPES from "./products.types";

const INITIAL_STATE = {
  products: [],
  isLoading: false,
  error: null,
};

export const ProductsReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCTS_ACTION_TYPES.SET_PRODUCTS_START:
      return {
        ...state,
        isLoading: true,
      };
    case PRODUCTS_ACTION_TYPES.SET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload,
        isLoading: false,
      };
    case PRODUCTS_ACTION_TYPES.SET_PRODUCTS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
