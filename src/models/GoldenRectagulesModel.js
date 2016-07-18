import { observable } from 'mobx';
import rectaguleProps from 'constants/goldenRectaguleProps';

class GoldenRectanguleModel {
  @observable rectangule = rectaguleProps;
}

export class GoldenRectangulesModel {
  mapElement;
  @observable rectangules = [];

  setMapElement(element) {
    this.mapElement = element;
  }

  addNewRectangule(maps) {
    this.rectangules.push(new GoldenRectanguleModel(maps));
  }
}
export default GoldenRectangulesModel;
