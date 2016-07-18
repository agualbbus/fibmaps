import React, { Component } from 'react';
import StartGoogleMaps from 'components/StartGoogleMaps';
import GoldenRectangulesWrapper from 'components/GoldenRectangulesWrapper';
import CtrlPanelsWrapper from 'components/CtrlPanelsWrapper';

export default class App extends Component {
  render() {
    return (
      <div>
        <StartGoogleMaps />
        <GoldenRectangulesWrapper />
        <CtrlPanelsWrapper />
      </div>
    );
  }
}
