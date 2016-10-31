import React, { Component } from 'react';

class Signup extends Component {
//signup,showDashBoard()
  render() {
    return (
      <div style = {{display: (this.props.signup) ? 'block' : 'none'}}>
        name <input name='name' type='text' placeholder='full name'></input>
        email <input name='email' type='text'></input>
        <button onClick = { this.props.showDashBoard }>Submit</button>
      </div>
    )
  }
}

export default Signup;
