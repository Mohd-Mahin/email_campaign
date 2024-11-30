import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container">
      <h1>dashboard</h1>
      <div class="fixed-action-btn">
        <Link
          to="/surveys/new"
          class="btn-floating btn-large waves-effect waves-light red right"
        >
          <i class="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
}
