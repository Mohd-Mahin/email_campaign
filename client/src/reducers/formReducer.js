import { UPDATE_FORM_STATE } from "../actions/types";

function authReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_FORM_STATE:
      return {
        ...state,
        [action.payload.formName]: action.payload.state,
      };
    default:
      return state;
  }
}

export default authReducer;
