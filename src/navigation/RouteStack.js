import React, { Component } from 'react'

import Home from '../views/Home/Home';
import Market from '../views/Market/Market';
import CreateItem from '../views/CreateItem/CreateItem';

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
          <Route exact path='/market' component={Market} />
          <Route exact path='/market/createItem' component={CreateItem} />
        </div>
      </Router>
    )
  }
}
