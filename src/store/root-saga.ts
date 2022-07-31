import { all, call } from "typed-redux-saga/macro";

import { productsSaga } from "./products/product.saga";
import { userSaga } from "./user/user.saga";

export function* rootSaga() {
  yield* all([call(productsSaga), call(userSaga)]);
}
