import React from 'react'
import { render } from 'react-dom'
import App from  './components/App'
import Login from './components/Splash'
import Dashboard from './components/Dashboard'
import Followering from './components/Followering'

// First we import some modules...
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

// Finally, we render a <Router> with some <Route>s.
// It does all the fancy routing stuff for us.
render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/followering" component={Followering} />
    </Route>
  </Router>
), document.getElementById('root'));

