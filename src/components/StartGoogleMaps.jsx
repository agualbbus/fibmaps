import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import googleMapLoader from 'lib/googleMapLoader';
import initMapConfig from 'constants/initMapConfig';
import { goldenRectangulesModel, mapModel } from 'models';
import GoogleMapDiv from 'components/GoogleMapDiv';
import AddRectangulePrompt from 'components/controlsPanel/AddRectangulePrompt';

export default class StartGoogleMaps extends Component {
  constructor() {
    super();
    this.state = {
      showModal: goldenRectangulesModel.rectangules.length === 0 || false,
    };
  }

  componentDidMount() {
    this._mapElement = ReactDOM.findDOMNode(this.refs.mapDiv);
    mapModel.mapInstance = this._mapElement;
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
  }

  _modalSubmit(recName) {
    this.setState({ showModal: false });
    goldenRectangulesModel.addNewRectangule(recName);
  }

  render() {
    return (
      <div>
        <GoogleMapDiv ref="mapDiv" />
        <AddRectangulePrompt
          showModal={this.state.showModal}
          modalSubmit={this._modalSubmit.bind(this)}
          title={'Add your first Golden Rectangule!'}
        />
      </div>
    );
  }
}
