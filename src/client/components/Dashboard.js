import React, { Component } from 'react';
import SearchResults from './SearchResults';
import ProjectList from './ProjectList';
import $ from 'jQuery';

class Dashboard extends Component {

  componentWillMount() {

  }

  render() {
  console.log('userinfo',this.props.userInfo);

    return (
      <div className="dashboard" style={{display: (this.props.showDashboard) ? 'block' : 'none'}}>
        <div>
          <input value={this.props.searchInput} type="text"/>
          <button type="submit">Show me projects!</button>
          <br/>
          <SearchResults searchResults={this.props.searchResults}/>
        </div>
        <div>
          <ProjectList myProjects={this.props.myProjects}/>
        </div>

      </div>
    )
  }
}

export default Dashboard;
