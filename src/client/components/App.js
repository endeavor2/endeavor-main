import React, {Component} from 'react'
import { render } from 'react-dom'
import Dashboard from './Dashboard'
import Navbar from './Navbar'
import Splash from './Splash'
import $ from 'jQuery'
import cookie from 'react-cookie'

import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: cookie.load('cookieId'),
      userInfo: {},
      interests: [],
      myProjects: [],
      searchResults: [],
      showDashboard: false,
      showNavbar: false,
      showSplash: true,
      searchValue: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchProjects = this.searchProjects.bind(this);
    this.addProject = this.addProject.bind(this);
  }

  handleChange(event) {
    this.setState({searchValue: event.target.value});
  }

  handleSubmit(event) {
    $.ajax({
      url: '/search',
      method: 'POST',
      body: this.state.searchValue,
      success: (data) => {
        console.log(data);
        if(data !== null) this.setState({ searchResults: data });
        else console.log('no results')
      },
      error: (err) => console.error(err)
    });
  }


  searchProjects() {

  }

  componentWillMount() {
    console.log(this.state.userId);
    if(this.state.userInfo.id === undefined) {
      $.ajax({ url: '/user/getInfo', method: 'GET',
        success: (data) => {
          console.log(data);
          if(data !== null) this.setState({ userInfo: data, showDashboard: true, showSplash: false, showNavbar: true });
          else console.log('no user with that username')
        },
        error: (err) => console.error(err)
      });
    }
  }

  render() {
    return (
      <div>
        <Navbar
          showNavbar={this.state.showNavbar}/>
        <h1>Endeavor 2: Rise of the Lycans</h1>
        <Dashboard
          userInfo={this.state.userInfo}
          showDashboard={this.state.showDashboard}
          myProjects={this.state.myProjects}
          searchResults={this.state.searchResults}
          value={this.state.searchValue}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}/>
        <Splash
          showSplash={this.state.showSplash}/>
        {/*
          next we replace `<Child>` with `this.props.children`
          the router will figure out the children for us
        */}
        {this.props.children}
      </div>
    )
  }
}

export default App;
