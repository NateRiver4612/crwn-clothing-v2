import { all, call } from "redux-saga/effects";
import { productsSaga } from "./products/product.saga";
import { userSaga } from "./user/user.saga";

export function* rootSaga() {
  yield all([call(productsSaga), call(userSaga)]);
}
