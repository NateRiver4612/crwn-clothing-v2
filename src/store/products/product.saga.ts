import { takeLatest, call, put, all } from "typed-redux-saga/macro";
import PRODUCTS_ACTION_TYPES from "./products.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setProductsFailed, setProductsSuccess } from "./products.action";

export function* setProductsAsync() {
  try {
    const data = yield* call(getCategoriesAndDocuments);

    yield* put(setProductsSuccess(data));
  } catch (error) {
    yield* put(setProductsFailed(error as Error)); 
  }
}

export function* onSetProductsAsync() {
  yield takeLatest(PRODUCTS_ACTION_TYPES.SET_PRODUCTS_START, setProductsAsync);
}

export function* productsSaga() {
  yield all([call(onSetProductsAsync)]);
}
