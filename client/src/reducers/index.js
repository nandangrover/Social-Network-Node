import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import navReducer from "./navReducer";

export default combineReducers({
  item: itemReducer,
  auth: authReducer,
  nav: navReducer,
  errors: errorReducer,
  users: userReducer
});
