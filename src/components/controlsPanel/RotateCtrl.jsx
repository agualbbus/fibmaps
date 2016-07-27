import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Slider from 'react-rangeslider';
import 'style/rangeslider';

@observer
export default class RotateCtrl extends Component {
  componentDidMount() {
  }

  handleRotate(value) {
    this.props.model.rotateAction(value);
  }

  render() {
    return (
      <div>
        <label>Rotate</label>
          <Slider
            min={-180}
            max={180}
            step={1}
            value={this.props.model.props.trnfrm.rot.z}
            onChange={this.handleRotate.bind(this)}
          />
      </div>
    );
  }
}

RotateCtrl.propTypes = {
  model: React.PropTypes.object.isRequired,
};
