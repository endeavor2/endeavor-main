import React, { Component } from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

class Navbar extends Component {

  render() {
    return (
      <div className="navbar navbar-default" style = {{display: (this.props.showNavbar) ? 'block' : 'none'}}>
        <img className="navbar-brand" id="octocat" src='http://cameronmcefee.com/img/work/the-octocat/codercat.jpg' />
        <ul className="nav navbar-nav">
          <li><Link to={'/dashboard'}>Dashboard</Link></li>
          <li><Link to={'/followering'}>Followering</Link></li>
        </ul>
      </div>
    )
  }
}

export default Navbar;
