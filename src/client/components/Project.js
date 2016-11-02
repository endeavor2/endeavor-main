import React, {Component} from 'react';

class Project extends Component {


  render() {
    return (
      <ul>
        <li>Title: {this.props.data.name}</li>
        <li>Description: {this.props.data.description.slice(0, 100)}</li>
        <li><a href={this.props.data.url}>GitHub link</a></li>
      </ul>
    );
  }
}

export default Project;
