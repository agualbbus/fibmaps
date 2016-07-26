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
      <div style={styles.container}>
        { panels }
      </div>
    );
  }
}

const styles = styler `
  container
    width: 70%
    max-width: 960px
    background-color: #40CFA9
    position: fixed
    bottom: 0
    right: 0%
    z-index: 2
    height: 85px
`;
