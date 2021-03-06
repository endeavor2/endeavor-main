import React, { Component } from 'react';
import Project from './Project';

class ProjectList extends Component {

//still need to pass props to each Project
  render() {
    let projects = this.props.myProjects.map( (ele, index) => {
      return (<li key={`mp${index}`}><Project data={ele}/>
      <button onClick={this.props.removeProject} id={`${ele.id}`} >Remove Project</button></li>)
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

export default ProjectList;
