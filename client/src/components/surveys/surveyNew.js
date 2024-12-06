import React, { useEffect, useState } from "react";
import SurveyForm from "./surveyForm";
import SurveyFormReview from "./surveyFormReview";
import { useDispatch } from "react-redux";
import * as action from "../../actions";

export default function SurveyNew() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      // clearing the form data
      dispatch(action.updateFormState("mailerFormData", {}));
    };
  }, []);

  const [isShowReview, setShowReview] = useState(false);
  return (
    <div>
      <h1>Create a Survey</h1>
      {isShowReview ? (
        <SurveyFormReview onCancel={() => setShowReview(false)} />
      ) : (
        <SurveyForm onSurveySubmit={() => setShowReview(true)} />
      )}
    </div>
  );
}
