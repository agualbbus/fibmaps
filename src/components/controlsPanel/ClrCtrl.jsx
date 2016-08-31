import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styler from 'react-styling';
import ClrSetup from 'components/controlsPanel/ClrSetup';

@observer
export default class ClrCtrl extends Component {

  _changeClrSpiral(clr) {
    this.props.model.changeColorAction('spiral', clr);
  }

  render() {
    const model = this.props.model;
    return (
      <div style={styles.container}>
        <label>Colors</label>
        <ul style={styles.ul}>
          <li style={styles.li}>
            <ClrSetup
              model={model}
              title={'Spiral'}
              defaultClr={model.props.colors.spiral}
              changeClrCb={this._changeClrSpiral.bind(this)}
            />
          </li>
        </ul>
      </div>
    );
  }
}

ClrCtrl.propTypes = {
  model: React.PropTypes.object.isRequired,
};

const styles = styler `
  container
    position: relative

  ul
    padding: 0

  li
    list-style: none
    cursor: pointer
`;
