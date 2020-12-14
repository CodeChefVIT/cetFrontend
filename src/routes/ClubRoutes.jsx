import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../pages/club/Dashboard/Dashboard";
import ClubSignin from "../pages/club/SignIn";
import SignUp from "../pages/club/SignUp";
import AddQuestions from "../pages/club/AddQuestion/AddQuestion";
import Profile from "../pages/club/Profile/Profile";

const ClubRoutes = () => {
  return (
    <Switch>
      <Route exact path='/club/signin' component={ClubSignin} />
      <Route exact path='/club/signup' component={SignUp} />
      <Route exact path='/club/dashboard' component={Dashboard} />
      <Route exact path='/club/profile' component={Profile} />
      {/* <Route exact path='/club/addQuestions' component={AddQuestions} /> */}
    </Switch>
  );
};

export default ClubRoutes;
