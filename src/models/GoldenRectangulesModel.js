import { observable, action } from 'mobx';
import rectaguleProps from 'constants/goldenRectanguleProps';
import ramdomId from 'lib/randomId';

class RectanguleModel {
  @observable props = rectaguleProps;
  static id = ramdomId();

  @action flipAction(axis) {
    if (axis === 'x') {
      this.props.trnfrm.rot.x = this.props.trnfrm.rot.x === 0 ? 180 : 0;
    }
    if (axis === 'y') {
      this.props.trnfrm.rot.y = this.props.trnfrm.rot.y === 0 ? 180 : 0;
    }
  }
}

export class GoldenRectangulesModel {
  mapElement;
  @observable rectangules = [];

  setMapElement(element) {
    this.mapElement = element;
  }

  @action addNewRectangule() {
    console.log('added new rectangule mobx');
    this.rectangules.push(new RectanguleModel());
  }

  @action addFirstRectangule() {
    if (this.rectangules.length === 0) {
      this.addNewRectangule();
    }
  }
}
export default GoldenRectangulesModel;
