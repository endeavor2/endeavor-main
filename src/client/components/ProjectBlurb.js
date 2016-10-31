import React, {Component} from 'react';

class ProjectBlurb extends Component {
  render() {
    return (
      <div className='blurb'>
        <div className='projName'>{this.props.name}</div>
        <div className='projDesc'>{this.props.desc}</div>
        <div className='projGitLink'>
          <a href={this.props.git}>{this.props.git}</a>
        </div>
      </div>
    );
  }
}

export default ProjectBlurb;
