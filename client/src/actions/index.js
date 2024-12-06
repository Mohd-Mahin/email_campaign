import axios from "axios";
import {
  FETCH_USER,
  UPDATE_FORM_STATE,
  SEND_MAIL,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
} from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateFormState = (formName, state) => ({
  type: UPDATE_FORM_STATE,
  payload: { formName, state },
});

export const sendMail = (formValue) => async (dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST });
  try {
    await axios.post("/api/surveys", formValue);
  } catch (error) {
    dispatch({ type: CREATE_POST_FAILURE, payload: error });
  }

  dispatch({ type: SEND_MAIL, payload: formValue }); // todo
};
