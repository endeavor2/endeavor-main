import React, { Component } from 'react';
import Splash from  './Splash';
import Dashboard from  './Dashboard';
import Signup from  './Signup';
import Profile from './Profile';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      myUser : 'hoon',
      currUser : 'hoon',
      signup : false,
      splash : true,
      dashboard : false,
      profile : false,
      mySuggestedProjects : [],
      usersProjects : []
    };
    this.showDashBoard = this.showDashBoard.bind(this);
    this.signUpClick = this.signUpClick.bind(this);
    this.showProfile = this.showProfile.bind(this);
    this.getSuggestedProjects = this.getSuggestedProjects.bind(this);
    this.getUsersProjects = this.getUsersProjects.bind(this);
    this.setCurrUser = this.setCurrUser.bind(this);
  }

  getSuggestedProjects() {
    fetch(`./user/suggested_projects/${this.state.myUser}`, {
      method: 'get'
    }).then(response => {
      return response.json();
    }).then(data => {
      this.setState({
        mySuggestedProjects: data
      });
    }).catch(error => {
      console.log('get request error!');
    })
  }

  getUsersProjects() {
    fetch(`/user/related_projects/${this.state.currUser}`, {
      method: 'get'
    }).then(response => {
      return response.json();
    }).then(data => {
      console.log(data);
      this.setState({
        usersProjects: data
      });
    }).catch(error => {
      console.log('get request error!');
    })
  }

  setCurrUser(user) {
    this.setState({
      currUser: user
    });
  }

  showDashBoard() {
    this.setState({
      splash: false,
      signup: false,
      dashboard: true
    });
  }

  signUpClick() {
    this.setState({
      signup : true,
      splash: false,
      dashboard: false
    });
  }

  showProfile() {
    this.setState({
      dashboard: false,
      profile: true
    });
  }

  render() {
    return (
      <div>
        <h1>GitMatch</h1>
        <Splash
          splash = {this.state.splash}
          showDashBoard = {this.showDashBoard}
          signUpClick = {this.signUpClick}/>
        <Dashboard
          getUsersProjects = {this.getUsersProjects}
          myUser = {this.state.myUser}
          setCurrUser = {this.setCurrUser}
          showProfile = {this.showProfile}
          dashboard = {this.state.dashboard}
          mySuggestedProjects = {this.state.mySuggestedProjects}
          getSuggestedProjects = {this.getSuggestedProjects}/>
        <Signup
          signup = {this.state.signup}
          showDashBoard = {this.showDashBoard}/>
        <Profile
          currUser = {this.state.currUser}
          profile = {this.state.profile}
          usersProjects = {this.state.usersProjects}
          getUsersProjects = {this.getUsersProjects}/>
      </div>
    )
  }
}

export default App;
