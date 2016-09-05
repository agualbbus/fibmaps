import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import googleMapLoader from 'lib/googleMapLoader';
import initMapConfig from 'constants/initMapConfig';
import { goldenRectangulesModel, mapModel } from 'models';
import GoogleMapDiv from 'components/GoogleMapDiv';
import AddRectangulePrompt from 'components/controlsPanel/AddRectangulePrompt';

@observer
export default class StartGoogleMaps extends Component {


  componentDidMount() {
    this._mapElement = ReactDOM.findDOMNode(this.refs.mapDiv);
    mapModel.mapInstance = this._mapElement;
    googleMapLoader()
    .then((maps) => {
      this._maps = maps;
      this._initMapHandler();
    });
  }

  @observable showModal = false;

  _handleGeolocation(mapInstance, initialLocation) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const location = new this._maps.LatLng(position.coords.latitude, position.coords.longitude);
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
    const mapInstance = mapModel.mapInstance = new this._maps.Map(this._mapElement, config);
    this._handleGeolocation(mapInstance, config.center);
    this._maps.event.addListenerOnce(mapInstance, 'idle', () => {
      goldenRectangulesModel.recoverFromLs()
        .catch(() => {
          this.showModal = true;
        });
    });
  }

  _modalSubmit(recName) {
    this.showModal = false;
    goldenRectangulesModel.addNewRectangule(recName);
  }

  render() {
    return (
      <div>
        <GoogleMapDiv ref="mapDiv" />
      </div>
    );
  }
}
