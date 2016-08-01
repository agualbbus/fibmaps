import { observable, action } from 'mobx';
import SingleRectanguleModel from 'models/SingleGoldenRectanguleModel';

export class GoldenRectangulesModel {
  mapElement;
  @observable rectangules = [];

  setMapElement(element) {
    this.mapElement = element;
  }

  @action addNewRectangule() {
    console.log('added new rectangule mobx');
    this.rectangules.push(new SingleRectanguleModel());
  }

  @action addFirstRectangule() {
    if (this.rectangules.length === 0) {
      this.addNewRectangule();
    }
  }
}
export default GoldenRectangulesModel;
