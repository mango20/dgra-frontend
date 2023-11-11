import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import authReducer from "../Action/AuthSlice";
import userListReducer from "../Action/UserListSlice";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    users: userListReducer,
  })
);

export default persistedReducer;
