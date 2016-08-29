import React, { Component } from 'react';
import { observer } from 'mobx-react';
import radium from 'radium';

@observer
@radium
export default class CtrlTab extends Component {
  render() {
    const styles = this.props.styles;
    const model = this.props.rectanguleModel;
    const activeStyle = model.isActiveInPanel ? styles.tabslist.li.active : null;
    return (
      <li onClick={this.props.clickCallback} style={[styles.tabslist.li, activeStyle]}>Rectangule</li>
    );
  }
}

CtrlTab.propTypes = {
  rectanguleModel: React.PropTypes.object.isRequired,
  clickCallback: React.PropTypes.func.isRequired,
  styles: React.PropTypes.object.isRequired,
};
