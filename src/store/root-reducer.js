import { combineReducers } from "redux";
import { UserReducer } from "./user/user.reducer";
import { ProductsReducer } from "./products/products.reducer";

export const rootReducer = combineReducers({
  user: UserReducer,
  shop: ProductsReducer,
});
