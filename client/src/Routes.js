import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import UserProfile from "./containers/UserProfile";
import Feed from "./containers/Feed";
import NotFound from "./containers/NotFound";

export default () =>
  <Switch>
    <Route path = "/" exact component = {Home} />
    <Route path = "/login" exact component = {Login}/>
    <Route path = "/signup" exact component = {Signup}/>
    <Route path = "/userProfile" exact component = {UserProfile}/>
    <Route path = "/feed" exact component = {Feed}/>
    <Route component={NotFound} />
  </Switch>;
