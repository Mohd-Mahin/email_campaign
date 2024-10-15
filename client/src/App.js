import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./components/Header";
import Landing from "./components/Landing";
import * as actions from "./actions";

const Dashboard = () => <div>Dashboard</div>;
const SurveyNew = () => <div>SurveyNew</div>;

function App(props) {
  useEffect(() => {
    props.fetchUser();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" Component={Landing} />
          <Route path="/surveys" Component={Dashboard} />
          <Route path="/surveys/new" Component={SurveyNew} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default connect(null, actions)(App);
