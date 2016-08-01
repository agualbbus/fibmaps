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
    return (
      <div>
        <label>Scale</label>
        <button className="btn" onClick={this.handleScale.bind(this)} data-do="inc">X2</button>
        <button className="btn" onClick={this.handleScale.bind(this)} data-do="dec">1/2</button>
      </div>
    );
  }
}

ScaleCtrl.propTypes = {
  model: React.PropTypes.object.isRequired,
};
