import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import styler from 'react-styling';
import Slider from 'react-rangeslider';
import 'style/rangeslider';

@observer
export default class RotateCtrl extends Component {
  componentDidMount() {
    this.input = ReactDOM.findDOMNode(this.refs.input);
  }

  _handleRotate(value) {
    this.props.model.rotateAction(value);
    this.input.value = value;
  }

  _handleInputChange(e) {
    let value = parseInt(e.target.value, 10);
    value = value > 180 ? 180 : value < -180 ? -180 : value;
    this.props.model.rotateAction(value);
    this.input.value = value;
  }

  render() {
    return (
      <div>
        <label>Rotate (deg)</label>
          <Slider
            min={-180}
            max={180}
            step={1}
            value={this.props.model.props.trnfrm.rot.z}
            onChange={this._handleRotate.bind(this)}
          />
          <input
            ref="input"
            type="number"
            style={styles.input}
            defaultValue={this.props.model.props.trnfrm.rot.z}
            onChange={this._handleInputChange.bind(this)}
          />
      </div>
    );
  }
}

RotateCtrl.propTypes = {
  model: React.PropTypes.object.isRequired,
};

const styles = styler `
  input
    width: 50px
    color: #000
`;
