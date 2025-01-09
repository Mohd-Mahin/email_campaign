import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchSurvey } from "../actions";
import SurveyList from "./surveys/surveyList";

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSurvey());
  }, []);

  return (
    <div className="container">
      <SurveyList />
      <div className="fixed-action-btn">
        <Link
          to="/surveys/new"
          className="btn-floating btn-large waves-effect waves-light red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
