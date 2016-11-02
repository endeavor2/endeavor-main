import React, {Component} from 'react';

class Project extends Component {


  render() {
    return (
      <div className="projectTitle">
      <h3>{this.props.data.name}</h3>
      <ul>
        <li>Description: {this.props.data.description ? this.props.data.description.slice(0, 100): ""}</li>
        <li><a href={this.props.data.url}>GitHub link</a></li>
      </ul>
    </div>
    );
  }
}

export default Project;
