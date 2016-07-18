import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { goldenRectangulesModel } from 'models';
import CtrlPanel from 'components/controlsPanel/CtrlPanel';

@observer
export default class CtrlPanelsWrapper extends Component {
  render() {
    const panels = goldenRectangulesModel.rectangules.map((rec, key) => <CtrlPanel model={rec} key={key} />);
    return (
      <div>
        { panels }
      </div>
    );
  }
}
