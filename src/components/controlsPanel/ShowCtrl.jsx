import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class ShowCtrl extends Component {
  handleShow() {
    this.props.model.visualizeAction();
  }

  render() {
    return (
      <div>
        <label>Show</label>
        <button className="tiny hide-control" onClick={this.handleShow.bind(this)}>
        { this.props.model.props.show ? 'Hide' : 'show' }
        </button>
      </div>
    );
  }
}

ShowCtrl.propTypes = {
  model: React.PropTypes.object.isRequired,
};
