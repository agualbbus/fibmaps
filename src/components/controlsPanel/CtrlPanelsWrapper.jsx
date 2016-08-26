import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styler from 'react-styling';
import CtrlPanel from 'components/controlsPanel/CtrlPanel';
import { goldenRectangulesModel } from 'models';


@observer
export default class CtrlPanelsWrapper extends Component {
  render() {
    const panels = goldenRectangulesModel.rectangules.map((rec, key) => <CtrlPanel rectanguleModel={rec} key={key} />);
    return (
      <div style={styles.container} id="controls-panel">
        { panels }
      </div>
    );
  }
}

const styles = styler `
  container
    width: 70%
    max-width: 960px
    position: fixed
    bottom: 0
    right: 0%
    z-index: 2
    height: 85px
    border: 1px solid #ccc;
    box-shadow: 10px 12px 12px 10px #b3b3b3;
    background-color: rgba(19, 19, 19, 0.81);
`;
