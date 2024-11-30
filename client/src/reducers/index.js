import { combineReducers } from "redux";
import authReducer from "./authReducer";
import formReducer from "./formReducer";

const reducers = combineReducers({
  auth: authReducer,
  forms: formReducer,
});

export default reducers;
