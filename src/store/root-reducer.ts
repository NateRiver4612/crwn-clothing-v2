import { combineReducers } from "redux";
import { UserReducer } from "./user/user.reducer";
import { ProductsReducer } from "./products/products.reducer";
import { CartReducer } from "./cart/cart.reducer";

export const rootReducer = combineReducers({
  user: UserReducer,
  shop: ProductsReducer,
  cart: CartReducer,
});
