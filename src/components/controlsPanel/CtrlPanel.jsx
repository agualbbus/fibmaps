import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class CtrlPanel extends Component {
  render() {
    return (
      <div>
        <div className="columns small-6">
        </div>
        <div className="columns small-6">
          <div className="columns small-12 medium-5">
              <label>Flip</label>
              <button className="tiny inline-flex flipV-control" >Flip V</button>
              <button className="tiny inline-flex flipH-control" >Flip H</button>
          </div>
          <div className="columns small-12 medium-3">
              <label>Switch</label>
              <button className="tiny hide-control" id="hideFib">Hide</button>
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
