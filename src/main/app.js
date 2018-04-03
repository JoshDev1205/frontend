import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Switch } from "react-router";
import { Router, Route, Layout, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import ReactGA from "react-ga";
import withTracker from "./middlewares/with_tracker";
import Home from "./../scenes/home/home";
import Sessions from "./../scenes/sessions/sessions";
import Results from "./../scenes/results/results";
import Trips from "./../scenes/trips/trips";
import Registrations from "./../scenes/registrations/registrations";

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route
            exact
            path={process.env.PUBLIC_URL + "/"}
            component={withTracker(Home)}
          />
          <Route
            path={process.env.PUBLIC_URL + "/login"}
            component={withTracker(Sessions)}
          />
          <Route
            path={process.env.PUBLIC_URL + "/register"}
            component={withTracker(Registrations)}
          />
          <Route
            path={process.env.PUBLIC_URL + "/results"}
            component={withTracker(Results)}
          />
          <Route
            path={process.env.PUBLIC_URL + "/trips"}
            component={withTracker(Trips)}
          />
        </Switch>
      </HashRouter>
    </Provider>
  );
};

export default App;
