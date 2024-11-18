import { FETCH_USER } from "../actions/types";

function authReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_USER: {
      return action.payload;
    }
    default:
      return state;
  }
}

export default authReducer;
