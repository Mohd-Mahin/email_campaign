import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../actions";
import Loader from "../loader";
import { formConfig } from "./surveyForm";

function SurveyFormReview(props) {
  const navigate = useNavigate();
  const { onCancel } = props || {};
  const formState = useSelector((state) => state.forms);
  const { mailerFormData, loading } = formState || {};
  const dispatch = useDispatch();

  const onSubmit = async () => {
    await dispatch(actions.sendMail(mailerFormData));
    navigate("/surveys");
  };

  const getFormData = () => {
    return Object.entries(mailerFormData).map(([key, value], index) => {
      return (
        <tr
          key={value}
          className={`${index % 2 === 0 ? " red lighten-4" : "red"}`}
        >
          <td>{formConfig[index].label}</td>
          <td>{value}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      {loading && <Loader />}
      {/* <pre>{JSON.stringify(mailerFormData, null, 2)}</pre> */}
      <table>
        <thead className="red darken-3">
          <tr>
            <th>Field</th>
            <th>Values</th>
          </tr>
        </thead>
        <tbody>{getFormData()}</tbody>
      </table>
      <button
        className="red btn-flat left white-text"
        style={{ marginTop: 20, outline: "1px dotted teal" }}
        onClick={onCancel}
      >
        Back
        <i className="material-icons right">mode_edit</i>
      </button>
      <button
        className="teal btn-flat right white-text"
        style={{ marginTop: 20, outline: "1px dotted teal" }}
        tabIndex={0}
        onClick={onSubmit}
      >
        Send
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
}

export default SurveyFormReview;
