import React, { Component } from 'react';
import { observer } from 'mobx-react';
import makeRgbClr from 'lib/makeRgbClr';
import styler from 'react-styling';
import radium from 'radium';
import { ChromePicker } from 'react-color';
import $ from 'jquery';

@observer
@radium
export default class ClrSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerActive: false,
    };

    this.windowEventName = `click.${this.props.model.id}-${this.props.title}`;  // generate a unique  id ofr the event
  }

  componentDidMount() {
    $(window).bind(this.windowEventName, this._handleClosePicker.bind(this));
  }

  componentWillUnmount() {
    $(window).unbind(this.windowEventName);
  }

  _handleStopPropagation(e) {
    e.stopPropagation();
  }

  _handleClickClr() {
    this.setState({
      pickerActive: true,
    });
  }

  _handleChangeClr() {
    this.props.changeClrCb();
  }

  _handleClosePicker() {
    this.setState({ pickerActive: false });
  }

  render() {
    const squareClrStyle = { background: makeRgbClr(this.props.defaultClr.rgb) };

    return (
      <div style={styles.container} onClick={this._handleStopPropagation.bind(this)} >
        { this.state.pickerActive ?
          <div style={styles.pickerContainer}>
            <span style={styles.close} onClick={this._handleClosePicker.bind(this)}>Close x</span>
             <ChromePicker color={ this.props.defaultClr.rgb } onChange={this.props.changeClrCb} />
          </div>
         : null }
          <div style={styles.textContainer} onClick={this._handleClickClr.bind(this)}>
            {this.props.title}
            <span style={[styles.colorSquare, squareClrStyle]}></span>
          </div>
      </div>
    );
  }
}

ClrSetup.propTypes = {
  model: React.PropTypes.object.isRequired,
  defaultClr: React.PropTypes.object.isRequired,
  title: React.PropTypes.string.isRequired,
  changeClrCb: React.PropTypes.func.isRequired,
};

const styles = styler `
  container
    position: relative

  close
    position: absolute
    right: 1px
    top: -20px
    color: rgb(113, 113, 113)
    background: #fff
    padding: 1px 5px
    font-size: 12px
    cursor: pointer
    box-shadow: rgba(0, 0, 0, 0.298039) 0px 0px 2px, rgba(0, 0, 0, 0.298039) 0px 4px 8px
    border-radius: 2px 2px 0 0
    border-bottom: 1px solid #ccc

  pickerContainer
    position: absolute
    top: -250px
    left: 0px

  colorSquare
    height: 15px;
    width: 15px;
    margin-left: 10px;
    margin-top: 3px;
    border: 1px solid #696969;

  textContainer
    display: inline-flex
`;
