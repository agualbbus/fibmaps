import { observable } from 'mobx';
import rectaguleProps from 'constants/goldenRectanguleProps';
import ramdomId from 'lib/randomId';

class RectanguleModel {
  @observable rectangule = rectaguleProps;
  static id = ramdomId();
}

export class GoldenRectangulesModel {
  mapElement;
  @observable rectangules = [];

  setMapElement(element) {
    this.mapElement = element;
  }

  addNewRectangule() {
    console.log('added new rectangule mobx');
    this.rectangules.push(new RectanguleModel());
  }

  addFirstRectangule() {
    if (this.rectangules.length === 0) {
      this.addNewRectangule();
    }
  }

  removeRectangule(id) {
    
  }
}
export default GoldenRectangulesModel;
