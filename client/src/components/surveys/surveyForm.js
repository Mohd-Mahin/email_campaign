import React from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { updateFormState } from "../../actions";
import validateEmail from "../../utils/validateEmail";
import SurveyField from "./surveyField";

export const formConfig = [
  {
    name: "title",
    label: "Survey Title",
  },
  {
    name: "subject",
    label: "Subject Line",
  },
  {
    name: "body",
    label: "Email Body",
  },
  {
    name: "recipients",
    label: "Recipients List",
  },
];

const formValidate = (values) => {
  const errors = {};

  formConfig.forEach((form) => {
    if (!values[form.name]) {
      errors[form.name] = `Required!!! Please enter the ${form.name}`;
    }
  });

  if (values.recipients) {
    if (validateEmail(values.recipients)) {
      errors["recipients"] = "Invalid Email";
    }
  }

  return errors;
};

export default function SurveyForm(props) {
  const { onSurveySubmit } = props;
  const formState = useSelector((state) => state.forms);
  const dispatch = useDispatch();
  const onFormSubmit = (values) => {
    dispatch(updateFormState("mailerFormData", values));
    onSurveySubmit();
  };

  const formFields = () =>
    formConfig.map((form) => {
      return (
        <Field
          key={form.name}
          type="text"
          name={form.name}
          component={SurveyField}
          label={form.label}
        />
      );
    });

  return (
    <Form
      onSubmit={onFormSubmit}
      validate={formValidate}
      initialValues={formState.mailerFormData}
      render={({
        handleSubmit,
        form,
        submitting,
        pristine,
        values,
        invalid,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div>{formFields()}</div>
            <Link
              to="/surveys"
              className="red btn-flat white-text"
              style={{ marginTop: 20, outline: "1px dotted red" }}
              tabIndex={0}
            >
              Cancel
            </Link>
            <button
              className="teal btn-flat right white-text"
              style={{ marginTop: 20, outline: "1px dotted teal" }}
              type="submit"
              disabled={submitting || invalid}
              tabIndex={0}
            >
              Next
              <i className="material-icons right">done</i>
            </button>
          </form>
        );
      }}
    />
  );
}
