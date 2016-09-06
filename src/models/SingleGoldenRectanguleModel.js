import { observable, action, computed } from 'mobx';
import rectaguleProps from 'constants/goldenRectanguleProps';
import ramdomId from 'lib/randomId';
import createGmapsOverlay from 'lib/googleMapsOverlayHandler';
import { mapModel } from 'models';

class SingleRectanguleModel {

  @observable props = {}
  @observable isActive = true;   // this is being obeserved by parent goldenRectangulesModel
  id = ramdomId();
  gmapsOverlay = { position: null }; // assigned later

  constructor(name, props) {
    this.name = name;
    this.props = props || rectaguleProps();

    mapModel.mapInstance.addListener('zoom_changed', () => {
      setTimeout(() => {
        this.resizeAction(parseFloat(this.gmapsOverlay.elem.style.width.replace('px', '')));
      }, 100);
    });
  }


  @computed get pixelsToPercentage() {
    return this.props.width.px * 100 / this.props.width.scale;
  }


  @computed get isLocked() {
    return !!this.props.locked;
  }

  @action createOverlayAction(id, elem) {
    this.gmapsOverlay = createGmapsOverlay(id, elem, this.props.position, {
      isLockedCb: () => this.isLocked,
      makeActiveCb: () => this.makeActiveAction(true),
      onZoomCb: () => this.zoomReset(),
      isActive: () => this.isActive,
      setNewPosition: (position) => this.setNewPositionAction(position),
    });
  }

  @action flipAction(axis) {
    if (this.isLocked) return;
    if (axis === 'x') {
      this.props.trnfrm.rot.x = this.props.trnfrm.rot.x === 0 ? 180 : 0;
    } else if (axis === 'y') {
      this.props.trnfrm.rot.y = this.props.trnfrm.rot.y === 0 ? 180 : 0;
    }
  }

  @action rotateAction(value) {
    if (this.isLocked) return;
    this.props.trnfrm.rot.z = value;
  }

  @action resizeAction(px) {
    if (this.isLocked) return;
    this.props.width.px = px;
    this.gmapsOverlay.resize();
  }

  @action scaleAction(what) {
    if (this.isLocked) return;
    if (what === 'inc') {
      this.props.width.scale = this.props.width.scale * 2;
    } else if (what === 'dec') {
      this.props.width.scale = this.props.width.scale / 2;
    }
    this.props.width.px = this.props.width.scale;
    this.gmapsOverlay.resize();
  }

  @action visualizeAction() {
    if (this.isLocked) return;
    this.props.show = !this.props.show;
  }

  @action lockAction() {
    this.props.locked = !this.props.locked;
  }

  @action makeActiveAction(bool) {
    this.isActive = bool;
  }

  @action changeColorAction(key, clr) {
    this.props.colors[key] = clr;
  }

  @action setNewPositionAction(position) {
    // save position as observable, but return original object to gmaps overlay
    this.props.position = {
      lat: position.lat(),
      lng: position.lng(),
    };
    return position;
  }

}

export default SingleRectanguleModel;
