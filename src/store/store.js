import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// root-reducer
const middleware = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
);
const presistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(presistConfig, rootReducer);

const composeEnhencers = compose(applyMiddleware(...middleware));
export const store = createStore(persistedReducer, undefined, composeEnhencers);
export const persistor = persistStore(store);
