import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as actions from "../actions";

function Dashboard(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchUser()); // todo
  }, []);

  return (
    <div className="container">
      <h1>dashboard</h1>
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
