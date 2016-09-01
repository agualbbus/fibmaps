import React, { Component } from 'react';
import { observer } from 'mobx-react';
import radium from 'radium';

@observer
@radium
export default class CtrlTab extends Component {
  _handleClickTab() {
    this.props.rectanguleModel.makeActiveAction(true);
  }
  render() {
    const model = this.props.rectanguleModel;
    const activeStyle = model.isActive ? this.props.liActiveStyle : null;
    return (
      <li onClick={this._handleClickTab.bind(this)} style={[this.props.liStyle, activeStyle]}>
      {model.name}
      </li>
    );
  }
}

CtrlTab.propTypes = {
  rectanguleModel: React.PropTypes.object.isRequired,
  liStyle: React.PropTypes.object.isRequired,
  liActiveStyle: React.PropTypes.object.isRequired,
};
