import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";

// pages
import Register from "./Test";
import Login from './App';


class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/register" component={Register}/>
          <Route path="/" component={Login}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;