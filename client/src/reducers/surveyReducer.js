import {
  FETCH_SURVEY,
  FETCH_SURVEY_FAILURE,
  FETCH_SURVEY_LOADING,
} from "../actions/types";

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

function surveyReducer(state = initialState, action) {
  console.log(action, "action");
  switch (action.type) {
    case FETCH_SURVEY:
      return {
        error: null,
        list: action.payload,
        isLoading: false,
      };
    case FETCH_SURVEY_FAILURE: {
      return {
        list: [],
        error: action.error,
        isLoading: false,
      };
    }
    case FETCH_SURVEY_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    default:
      return state;
  }
}

export default surveyReducer;
