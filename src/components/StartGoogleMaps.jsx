import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import googleMapLoader from 'lib/googleMapLoader';
import initMapConfig from 'constants/initMapConfig';
import { goldenRectangulesModel } from 'models';
import GoogleMapDiv from 'components/GoogleMapDiv';


export default class StartGoogleMaps extends Component {
  componentDidMount() {
    this._mapElement = ReactDOM.findDOMNode(this.refs.mapDiv);
    googleMapLoader({})
    .then((maps) => {
      this._maps = maps;
      this._initMapHandler();
    });
  }

  _handleGeolocation(mapInstance, initialLocation) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const location = new this._maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log('initial loc is', location);
        mapInstance.setCenter(location);
      }, () => {
        this._handleNoGeolocation(true, mapInstance, initialLocation);
      });
    } else {
      this._handleNoGeolocation(false, mapInstance, initialLocation);
    }
  }

  _handleNoGeolocation(errorFlag, map, location) {
    map.setCenter(location);
  }

  _initMapHandler() {
    const config = initMapConfig(this._maps);
    const mapInstance = new this._maps.Map(this._mapElement, config);
    this._handleGeolocation(mapInstance, config.center);
    this._maps.event.addListener(mapInstance, 'idle', () => {
      goldenRectangulesModel.setMapElement(ReactDOM.findDOMNode(this.refs.mapDiv));
      goldenRectangulesModel.addNewRectangule();
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
