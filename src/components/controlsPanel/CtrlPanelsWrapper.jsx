import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styler from 'react-styling';
import CtrlPanel from 'components/controlsPanel/CtrlPanel';
import CtrlTab from 'components/controlsPanel/CtrlTab';
import { goldenRectangulesModel } from 'models';


@observer
export default class CtrlPanelsWrapper extends Component {

  _handleAddRectangule() {
    goldenRectangulesModel.addNewRectangule();
  }

  render() {
    const panels = goldenRectangulesModel.rectangules.map(rec => <CtrlPanel rectanguleModel={rec} key={rec.id} />);

    const tabs = goldenRectangulesModel.rectangules.map(rec => <CtrlTab
      rectanguleModel={rec}
      liStyle={styles.tabslist.li}
      liActiveStyle={styles.tabslist.li.active}
      key={rec.id}
    />);

    return (
      <div style={styles.container} id="controls-panel">
        <ul style={styles.tabslist}>
          { tabs }
          <li style={styles.tabslist.li} onClick={this._handleAddRectangule.bind(this)}>+ tab</li>
        </ul>
        { panels }
      </div>
    );
  }
}

const styles = styler `
  container
    position: relative
    width: 70%
    max-width: 960px
    position: fixed
    bottom: 0
    right: 0%
    z-index: 2
    height: 85px
    border: 1px solid #ccc
    box-shadow: 10px 12px 12px 10px #b3b3b3
    background-color: rgba(19, 19, 19, 0.81)

  tabslist
    position: absolute;
    left: 0px;
    top: -25px;
    width: 100%;
    padding: 0;

    li
      list-style: none
      background: rgba(82, 82, 82, 0.84)
      display: inline-block
      padding: 3px 5px 0
      height: 25px
      min-width: 84px
      text-align: center
      border-top-left-radius: 8px
      border-top-right-radius: 8px
      cursor: pointer

      active
        background: rgba(19, 19, 19, 0.811765);

`;
