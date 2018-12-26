import React, { Component } from 'react'

import Home from '../views/Home/Home';
import Market from '../views/Market/Market';

import {
    BrowserRouter as Router,
    Route,
    Link,
  } from 'react-router-dom';


export default class RouteStack extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/market' component={Market} />
        </div>
      </Router>
    )
  }
}
