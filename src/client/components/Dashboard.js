import React, { Component } from 'react';
import SearchResults from './SearchResults';
import ProjectList from './ProjectList';
import $ from 'jQuery';

class Dashboard extends Component {

  componentWillMount() {

  }

  render() {
    return (
      <div className="dashboard" style={{display: (this.props.showDashboard) ? 'block' : 'none'}}>
        <div className="welcome">
           <img src={this.props.userInfo.url}></img>
        <ul>
          <li>Username: {this.props.userInfo.username}</li>
          <li>Name: {this.props.userInfo.name}</li>
          <li>Company: {this.props.userInfo.company}</li>
          <li>Bio: {this.props.userInfo.bio}</li>
        </ul>
      </div>
        <div>
          <input value={this.props.searchValue} onChange={this.props.handleChange} type="text"/>
          <button type="submit" onClick={this.props.handleSubmit}>Show me projects!</button>
          <br/>
          <SearchResults addProject={this.props.addProject} searchResults={this.props.searchResults}/>
        </div>
        <div>
          <ProjectList myProjects={this.props.myProjects}/>
        </div>

      </div>
    )
  }
}

export default Dashboard;
