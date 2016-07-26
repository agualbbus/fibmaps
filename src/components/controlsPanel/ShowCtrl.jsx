import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class ShowCtrl extends Component {
  render() {
    return (
      <div>
        <label>Show</label>
        <button className="tiny hide-control" id="hideFib">Hide</button>
      </div>
    );
  }
}
