import { compose, createStore, applyMiddleware, Middleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";

import { rootReducer } from "./root-reducer";

import { rootSaga } from "./root-saga";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

//Define type for our rootReducer
export type RootState = ReturnType<typeof rootReducer>

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const middleWare = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleware,
].filter((middlewar):middlewar is Middleware => Boolean(middlewar) );

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWare));

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["cart"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composeEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
