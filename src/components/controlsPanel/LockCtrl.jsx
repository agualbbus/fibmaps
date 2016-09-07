import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class LockCtrl extends Component {
  handleLock() {
    this.props.model.lockAction();
  }

  render() {
    return (
      <div>
        <label>{ this.props.model.isLocked ? 'Locked' : 'Unlocked'}</label>
        <br />
        <button className="btn btn-sm" onClick={this.handleLock.bind(this)} >
          { this.props.model.isLocked ? <i className="fa fa-lock"></i> : <i className="fa fa-unlock"></i> }
        </button>
      </div>
    );
  }
}

LockCtrl.propTypes = {
  model: React.PropTypes.object.isRequired,
};
