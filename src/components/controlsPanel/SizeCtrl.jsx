import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { observe } from 'mobx';
import Slider from 'react-rangeslider';
import styler from 'react-styling';
import 'style/rangeslider';

@observer
export default class SizeCtrl extends Component {


  componentDidMount() {
    this.input = ReactDOM.findDOMNode(this.refs.input);
    observe(this.props.model.props.width, (change) => {
      this.input.value = change.object.px;
    });
  }


  _handleResize(value) {
    const percentageToPx = value * this.props.model.props.width.scale / 100;
    this.input.value = percentageToPx;
    this.props.model.resizeAction(percentageToPx);
  }

  _handleInputChange(e) {
    let value = parseInt(e.target.value, 10);
    value = value <= 0 ? 10 : value;
    this.props.model.resizeAction(value);
  }

  render() {
    return (
      <div>
        <label>Resize(px)</label>
          <Slider
            min={1}
            max={100}
            step={1}
            value={this.props.model.pixelsToPercentage}
            onChange={this._handleResize.bind(this)}
          />
          <input
            ref="input"
            type="number"
            style={styles.input}
            defaultValue={this.props.model.props.width.px}
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
