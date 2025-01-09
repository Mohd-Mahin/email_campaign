import { combineReducers } from "redux";
import authReducer from "./authReducer";
import formReducer from "./formReducer";
import surveyReducer from "./surveyReducer";

const reducers = combineReducers({
  auth: authReducer,
  forms: formReducer,
  survey: surveyReducer,
});

export default reducers;
