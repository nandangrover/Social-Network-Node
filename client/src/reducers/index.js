import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  item: itemReducer,
  auth: authReducer,
  errors: errorReducer,
  users: userReducer
});
