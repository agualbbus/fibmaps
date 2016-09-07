import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class FlipCtrl extends Component {
  handleClick(e) {
    this.props.model.flipAction(e.target.dataset.axis);
  }

  render() {
    const btnClass = `btn ${this.props.model.isLocked ? 'disabled' : ''}`;
    return (
      <div className="form-group">
        <label>Flip</label>
        <br />
        <div className="btn-group btn-group-sm">
          <button type="button" className={btnClass} onClick={this.handleClick.bind(this)} data-axis="x">Flip V</button>
          <button type="button" className={btnClass} onClick={this.handleClick.bind(this)} data-axis="y">Flip H</button>
        </div>
      </div>
    );
  }
}

FlipCtrl.propTypes = {
  model: React.PropTypes.object.isRequired,
};
