import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";

// pages
import RegisterPage from "./pages/RegisterPage.js";
import Login from './App.js';


class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/register" component={RegisterPage}/>
          <Route path="/" component={Login}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;