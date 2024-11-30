import React from "react";

export default function SurveyField(props) {
  const { input, label, meta } = props;

  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      {meta.error && meta.touched && (
        <span className="red-text">{meta.error}</span>
      )}
    </div>
  );
}
