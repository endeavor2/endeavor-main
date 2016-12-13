import React, { Component } from 'react';

class Splash extends Component {

  render() {
    return (

      <div className="splash" style = {{display: (this.props.showSplash) ? 'block' : 'none'}}>
        <div id="main">
          <h1 id="maintitle">Github Project Match</h1>
          <img id="splashLogo" src='http://cameronmcefee.com/img/work/the-octocat/codercat.jpg' />
          <a className="loginButton" href = '/login'>Log In</a>
        </div>
      </div>
    )
  }
}

export default Splash;
