import React, { Component } from 'react';
import { observer } from 'mobx-react';
import FlipCtrl from 'components/controlsPanel/FlipCtrl';
import ShowCtrl from 'components/controlsPanel/ShowCtrl';
import RotateCtrl from 'components/controlsPanel/RotateCtrl';
import SizeCtrl from 'components/controlsPanel/SizeCtrl';
import ScaleCtrl from 'components/controlsPanel/ScaleCtrl';
import LockCtrl from 'components/controlsPanel/LockCtrl';


@observer
export default class CtrlPanel extends Component {
  render() {
    const model = this.props.rectanguleModel;
    return model.isActiveInPanel ?
      <div className="row">
        <div className="col-xs-6">
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <div className="col-xs-12 ">
                <RotateCtrl model={model} />
              </div>
            </div>
            <div className="col-xs-12 col-sm-4">
              <div className="col-xs-12 ">
                <SizeCtrl model={model} />
              </div>
            </div>
            <div className="col-xs-12 col-sm-4">
              <div className="col-xs-12 ">
                <ScaleCtrl model={model} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="col-xs-12 col-sm-5">
            <FlipCtrl model={model} />
          </div>
          <div className="col-xs-12 col-sm-3">
            <ShowCtrl model={model} />
          </div>
          <div className="col-xs-12 col-sm-4">
            <LockCtrl model={model} />
          </div>
        </div>
      </div>
    : null;
  }
}

CtrlPanel.propTypes = {
  rectanguleModel: React.PropTypes.object.isRequired,
};
