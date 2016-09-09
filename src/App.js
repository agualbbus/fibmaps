import React, { Component } from 'react';
import StartGoogleMaps from 'components/StartGoogleMaps';
import GoldenRectangulesWrapper from 'components/goldenRectangule/GoldenRectangulesWrapper';
import CtrlPanelsWrapper from 'components/controlsPanel/CtrlPanelsWrapper';
import FirebaseUI from 'components/FirebaseUI';
import { currentUserModel } from 'models';

export default class App extends Component {
  render() {
    return (
      <div>
        <StartGoogleMaps />
        <GoldenRectangulesWrapper />
        <CtrlPanelsWrapper />
        { currentUserModel.user ? <FirebaseUI /> : null }
      </div>
    );
  }
}
