import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Slider from 'react-rangeslider';
import styler from 'react-styling';
import 'style/rangeslider';

@observer
export default class SizeCtrl extends Component {
  componentDidMount() {
  }

  handleResize(value) {
    this.props.model.resizeAction(value);
  }

  _handleInputChange(e) {
    let value = parseInt(e.target.value, 10);
    value = value > 100 ? 100 : value < -10 ? -10 : value;
    this.props.model.resizeAction(value);
    this.input.value = value;
  }

  render() {
    return (
      <div>
        <label>Resize(%)</label>
          <Slider
            min={10}
            max={100}
            step={1}
            value={this.props.model.props.width.percentage}
            onChange={this.handleResize.bind(this)}
          />
          <input
            ref="input"
            type="number"
            style={styles.input}
            defaultValue={this.props.model.props.width.percentage}
            onChange={this._handleInputChange.bind(this)}
          />
      </div>
    );
  }
}

SizeCtrl.propTypes = {
  model: React.PropTypes.object.isRequired,
};

const styles = styler `
  input
    width: 50px
    color: #000
`;
