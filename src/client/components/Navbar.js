import React, { Component } from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

class Navbar extends Component {

  render() {
    return (
      <div className = "navbar" style = {{display: (this.props.showNavbar) ? 'block' : 'none'}}>
        <ul>
          <li><Link to={'/dashboard'}>Dashboard</Link></li>
        </ul>
      </div>
    )
  }
}

export default Navbar;