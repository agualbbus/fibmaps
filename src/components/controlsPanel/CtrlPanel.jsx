import React, { Component } from 'react';
import { observer } from 'mobx-react';
import FlipCtrl from 'components/controlsPanel/FlipCtrl';
import ShowCtrl from 'components/controlsPanel/ShowCtrl';
import RotateCtrl from 'components/controlsPanel/RotateCtrl';


@observer
export default class CtrlPanel extends Component {
  render() {
    const model = this.props.rectanguleModel;
    return (
      <div>
        <div className="columns small-6">
          <div className="columns small-12 medium-4">
            <div className="columns small-12 ">
              <RotateCtrl model={model} />
            </div>
          </div>
        </div>
        <div className="columns small-6">
          <div className="columns small-12 medium-5">
            <FlipCtrl model={model} />
          </div>
          <div className="columns small-12 medium-3">
            <ShowCtrl model={model} />
          </div>
          <div className="columns small-12 medium-4">
              <label>Lock</label>
              <button className="tiny lock-control" >
                  <i className="fa fa-unlock"></i>
              </button>
          </div>
        </div>
      </div>
    );
  }
}

CtrlPanel.propTypes = {
  rectanguleModel: React.PropTypes.object.isRequired,
};
