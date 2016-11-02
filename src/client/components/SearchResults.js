import React, { Component } from 'react';
import Project from './Project';

class SearchResults extends Component {

//still need to pass props to each Project
  render() {
    let projects = this.props.searchResults.map( (ele, index) => {
      return (<div key={`sr${index}`}><Project data={ele} />
      <button className="btn btn-default" onClick={this.props.addProject} name={`${ele.id},${ele.name},${ele.description},${ele.url}`} >Add Project</button></div>)
    });

    return (
      <div className="project-list">
        {projects}
      </div>
    )
  }
}

export default SearchResults;
