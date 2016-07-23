import { observable } from 'mobx';
import rectaguleProps from 'constants/goldenRectanguleProps';

class RectanguleModel {
  @observable rectangule = rectaguleProps;
}

export class GoldenRectangulesModel {
  mapElement;
  @observable rectangules = [];

  setMapElement(element) {
    this.mapElement = element;
  }

  addNewRectangule(maps) {
    this.rectangules.push(new RectanguleModel(maps));
  }
}
export default GoldenRectangulesModel;
