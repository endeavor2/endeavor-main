import React, { Component } from 'react';
import Project from './Project';

class SearchResults extends Component {

//still need to pass props to each Project
  render() {
    let projects = this.props.searchResults.map( (ele, index) => {
      return (<li key={`sr${index}`}><Project>This is a project</Project><button></button></li>)
    });

    return (
      <div className="project-list">
        <ul>
          {projects}
        </ul>
      </div>
    )
  }
}

export default SearchResults;