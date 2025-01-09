import React from "react";
import { useSelector } from "react-redux";

import Loader from "../loader";

export default function SurveyList() {
  const { isLoading, list: surveyList } = useSelector((state) => state.survey);

  console.log(surveyList, "surveyList");
  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && surveyList?.length > 0 && (
        <div>
          {surveyList.reverse().map((survey) => {
            return (
              <div className="card" key={survey._id}>
                <div className="card-content">
                  <span className="card-title">{survey.title}</span>
                  <p>{survey.subject}</p>
                  <p className="right">
                    Sent on: {new Date(survey.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="card-action">
                  <span>Yes: {survey.yes}</span> &nbsp; &nbsp;
                  <span>No: {survey.no}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
