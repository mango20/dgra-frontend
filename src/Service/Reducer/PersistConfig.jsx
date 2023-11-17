import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import authReducer from "../Action/AuthSlice";
import userListReducer from "../Action/UserListSlice";
import userInfoReducer from "../Action/UserInfo";
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
    userInfo: userInfoReducer,
  })
);

export default persistedReducer;
