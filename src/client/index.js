import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { Router, Route, Link, IndexRoute } from 'react-router'


render((
  <App />
), document.getElementById('root')
);

  // <Router>
  //   <Route path="/" component={App}>
  //     <IndexRoute component={Splash} />
  //     <Route path="/dashboard" component={Dashboard} />
  //   </Route>
  // </Router>