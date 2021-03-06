import React, { Component } from 'react';
import { observer } from 'mobx-react';
import 'style/rangeslider';

@observer
export default class ScaleCtrl extends Component {
  componentDidMount() {
  }

  handleScale(e) {
    this.props.model.scaleAction(e.target.dataset.do);
  }

  render() {
    const btnClass = `btn ${this.props.model.isLocked ? 'disabled' : ''}`;
    return (
      <div>
        <label>Scale</label>
        <br />
        <div className="btn-group btn-group-sm">
          <button className={btnClass} onClick={this.handleScale.bind(this)} data-do="inc">X2</button>
          <button className={btnClass} onClick={this.handleScale.bind(this)} data-do="dec">1/2</button>
        </div>
      </div>
    );
  }
}

ScaleCtrl.propTypes = {
  model: React.PropTypes.object.isRequired,
};
