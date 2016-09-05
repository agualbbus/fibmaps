import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styler from 'react-styling';
import radium from 'radium';
import FlipCtrl from 'components/controlsPanel/FlipCtrl';
import ShowCtrl from 'components/controlsPanel/ShowCtrl';
import RotateCtrl from 'components/controlsPanel/RotateCtrl';
import SizeCtrl from 'components/controlsPanel/SizeCtrl';
import ScaleCtrl from 'components/controlsPanel/ScaleCtrl';
import LockCtrl from 'components/controlsPanel/LockCtrl';
import ClrCtrl from 'components/controlsPanel/ClrCtrl';

@radium
@observer
export default class CtrlPanel extends Component {
  render() {
    const model = this.props.rectanguleModel;
    return model.isActive ?
      <div >
        <div style={[styles.col, styles.rotate]}>
          <RotateCtrl model={model} />
        </div>
        <div style={[styles.col, styles.size]}>
          <SizeCtrl model={model} />
        </div>
        <div style={[styles.col, styles.scale]}>
          <ScaleCtrl model={model} />
        </div>
        <div style={[styles.col, styles.flip]}>
          <FlipCtrl model={model} />
        </div>
        <div style={[styles.col, styles.show]}>
          <ShowCtrl model={model} />
        </div>
        <div style={[styles.col, styles.lock]}>
          <LockCtrl model={model} />
        </div>
        <div style={[styles.col, styles.lock]}>
          <ClrCtrl model={model} />
        </div>
      </div>
    : null;
  }
}

CtrlPanel.propTypes = {
  rectanguleModel: React.PropTypes.object.isRequired,
};

const styles = styler `
  col
    padding: 0 10px
    display: inline-block
    float: left
    color: #fff

  rotate
    width: 16%

  size
    width: 16%

  scale
    width: 12%

  flip:
    width: 15%

  show:
    width: 6%

  lock:
    width: 6%
`;
