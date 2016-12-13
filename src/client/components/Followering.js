import React, { Component } from 'react';
import Followers from './Followers';
import Following from './Following';

class Followering extends Component {

  componentWillMount() {

  }
  render () {
    return (
      <div>
        <Followers/>
        <Following/>
      </div>
    )
  }
}

export default Followering;