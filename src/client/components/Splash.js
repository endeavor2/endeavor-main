import React, { Component } from 'react';

class Splash extends Component {

  render() {
    return (
      <div className="splash" style = {{display: (this.props.showSplash) ? 'block' : 'none'}}>
        <a
          className = 'btn-primary'
          href = '/login'>
          Log In
        </a>
      </div>
    )
  }
}

export default Splash;
