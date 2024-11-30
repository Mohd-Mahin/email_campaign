import React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateFormState } from "../../actions";
import validateEmail from "../../utils/validateEmail";
import SurveyField from "./surveyField";

const formInitialValues = { title: "" };

const formConfig = [
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

export default function SurveyForm() {
  const dispatch = useDispatch();
  const onFormSubmit = (values) => {
    console.log("form values", values);
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
      initialValues={formInitialValues}
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
            <FormSpy
              subscription={{ values: true }}
              onChange={(state) =>
                dispatch(updateFormState("mailer", state.values))
              }
            />
            <Link
              to="/surveys"
              className="red btn-flat white-text"
              style={{ marginTop: 20 }}
            >
              Cancel
            </Link>
            <button
              style={{ marginTop: 20 }}
              className="teal btn-flat right white-text"
              type="submit"
              disabled={submitting || pristine || invalid}
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
