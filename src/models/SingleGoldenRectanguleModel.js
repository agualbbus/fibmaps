import { observable, action, computed } from 'mobx';
import rectaguleProps from 'constants/goldenRectanguleProps';
import ramdomId from 'lib/randomId';
import createGmapsOverlay from 'lib/googleMapsOverlayHandler';


class SingleRectanguleModel {

  @observable props = null;
  @observable isActive = true;   // this is being obeserved by parent goldenRectangulesModel
  id = ramdomId();
  gmapsOverlay = null; // assigned later

  constructor(name, props) {
    this.name = name;
    this.props = props || rectaguleProps();
  }


  @computed get pixelsWidth() {
    return this.props.width.percentage * this.props.width.scale / 100;
  }

  @computed get isLocked() {
    return !!this.props.locked;
  }

  @action createOverlayAction(id, elem) {
    this.gmapsOverlay = createGmapsOverlay(id, elem, {
      isLockedCb: () => this.isLocked,
      makeActiveCb: () => this.makeActiveAction(true),
      onZoomCb: () => this.zoomReset(),
      isActive: () => this.isActive,
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

  @action resizeAction(value) {
    if (this.isLocked) return;
    this.props.width.percentage = value;
    this.gmapsOverlay.resize();
  }

  @action scaleAction(what) {
    if (this.isLocked) return;
    if (what === 'inc') {
      this.props.width.scale = this.props.width.scale * 2;
    } else if (what === 'dec') {
      this.props.width.scale = this.props.width.scale / 2;
    }
    this.props.width.percentage = 50;
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

}

export default SingleRectanguleModel;
