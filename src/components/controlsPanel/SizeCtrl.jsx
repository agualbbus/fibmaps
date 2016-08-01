import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Slider from 'react-rangeslider';
import 'style/rangeslider';

@observer
export default class SizeCtrl extends Component {
  componentDidMount() {
  }

  handleResize(value) {
    this.props.model.resizeAction(value);
  }

  render() {
    return (
      <div>
        <label>Resize</label>
          <Slider
            min={0}
            max={100}
            step={1}
            value={this.props.model.props.width.percentage}
            onChange={this.handleResize.bind(this)}
          />
      </div>
    );
  }
}

SizeCtrl.propTypes = {
  model: React.PropTypes.object.isRequired,
};
