import { observable, action, computed } from 'mobx';
import rectaguleProps from 'constants/goldenRectanguleProps';
import ramdomId from 'lib/randomId';
import createGmapsOverlay from 'lib/googleMapsOverlayHandler';


class SingleRectanguleModel {
  id = ramdomId();

  gmapsOverlay = null; // assigned later

  @observable props = rectaguleProps();

  @observable isActiveInPanel = true;   // this is being obeserve by parent goldenRectangulesModel

  @computed get pixelsWidth() {
    return this.props.width.percentage * this.props.width.scale / 100;
  }

  @computed get isLocked() {
    return !!this.props.locked;
  }

  @action createOverlayAction(id, elem) {
    const callback = () => this.isLocked;
    const makeActiveCb = () => this.makeActiveInPanel(true);
    this.gmapsOverlay = createGmapsOverlay(id, elem, callback, makeActiveCb);
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

  @action makeActiveInPanel(bool) {
    this.isActiveInPanel = bool;
  }

}

export default SingleRectanguleModel;
