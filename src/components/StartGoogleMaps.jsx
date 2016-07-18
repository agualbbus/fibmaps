import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import googleMapLoader from 'lib/googleMapLoader';
import initMapEvents from 'constants/initMapEvents';
import { goldenRectangulesModel } from 'models';
import GoogleMapDiv from 'components/GoogleMapDiv';


export default class StartGoogleMaps extends Component {
  componentDidMount() {
    this._initMap();
  }

  _init() {
    if (this._initialized) {
      return;
    }
    this.initialized = true;

    googleMapLoader()
    .then((maps) => {
      initMapEvents(maps);
      maps.event.addListener(maps, 'idle', () => {
        goldenRectangulesModel.setMapElement(ReactDOM.findDOMNode(this.refs.mapDiv));
        goldenRectangulesModel.addNewRectangule();
      });
    });
  }

  render() {
    return (
      <div>
        <GoogleMapDiv ref="mapDiv" />
      </div>
    );
  }
}
