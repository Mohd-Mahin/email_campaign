import axios from "axios";
import {
  FETCH_USER,
  UPDATE_FORM_STATE,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
} from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/user");
  dispatch({ type: FETCH_USER, payload: res.data || null });
};

export const updateFormState = (formName, state) => ({
  type: UPDATE_FORM_STATE,
  payload: { formName, state },
});

export const sendMail = (formValue) => async (dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST });
  try {
    const res = await axios.post("/api/surveys", formValue);
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
    dispatch({ type: CREATE_POST_FAILURE, payload: error });
  }
};
