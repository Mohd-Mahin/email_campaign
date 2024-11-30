import axios from "axios";
import { FETCH_USER, UPDATE_FORM_STATE } from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateFormState = (formName, state) => ({
  type: UPDATE_FORM_STATE,
  payload: { formName, state },
});
