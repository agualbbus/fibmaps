import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class ShowCtrl extends Component {
  handleShow() {
    this.props.model.visualizeAction();
  }

  render() {
    const btnClass = `btn btn-sm ${this.props.model.isLocked ? 'disabled' : ''}`;
    return (
      <div>
        <label>{ this.props.model.props.show ? 'Visible' : 'Hidden' }</label>
        <br />
        <button className={btnClass} onClick={this.handleShow.bind(this)}>
        { this.props.model.props.show ? 'Hide' : 'Show' }
        </button>
      </div>
    );
  }
}

ShowCtrl.propTypes = {
  model: React.PropTypes.object.isRequired,
};
