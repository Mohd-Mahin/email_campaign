import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "./components/Header";
import Landing from "./components/Landing";
import Dashboard from "./components/dashboard";
import SurveyNew from "./components/surveys/surveyNew";
import * as actions from "./actions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchUser());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" Component={Landing} />
            <Route path="/surveys" Component={Dashboard} />
            <Route path="/surveys/new" Component={SurveyNew} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
