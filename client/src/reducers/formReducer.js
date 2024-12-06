import {
  UPDATE_FORM_STATE,
  CREATE_POST_REQUEST,
  CREATE_POST_FAILURE,
} from "../actions/types";

const initialFormData = {
  mailerFormData: {},
  loading: false,
  error: null,
};

function formReducer(state = initialFormData, action) {
  switch (action.type) {
    case UPDATE_FORM_STATE:
      return {
        ...state,
        loading: false,
        [action.payload.formName]: action.payload.state,
      };
    case CREATE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export default formReducer;
