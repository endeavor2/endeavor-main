import React, { Component } from 'react';
import ProjectBlurb from './ProjectBlurb.js';


class Dashboard extends Component {
  componentWillMount() {
    this.props.setCurrUser(this.props.myUser);
  }
  componentDidMount() {
    this.props.getSuggestedProjects();
  }
  generateProjBlurbs() {
    return this.props.mySuggestedProjects.map(proj => {
      return (
        <ProjectBlurb
          name = {proj.name}
          desc = {proj.description}
          git = {proj.github_link}
          key = {proj.id} />
      );
    });
  }
  render() {
  console.log('userinfo',this.props.userInfo);

    return (
      <div>
        <button
          className = 'btn-link'
          onClick = {(event) => {
            this.props.showProfile();
            this.props.getUsersProjects(this.props.currUser);
          }}
          style = {{display: (this.props.dashboard) ? 'block' : 'none'}}
          type = 'button'>
          Profile
        </button>
        <div style = {{display: (this.props.dashboard) ? 'block' : 'none'}}>
          {this.generateProjBlurbs()}
        </div>
      </div>
    )
  }
}

export default Dashboard;
