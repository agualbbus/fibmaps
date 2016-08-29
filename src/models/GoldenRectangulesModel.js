import { observable, action } from 'mobx';
import SingleRectanguleModel from 'models/SingleGoldenRectanguleModel';

export class GoldenRectangulesModel {
  mapElement;
  @observable rectangules = [];
  @observable activeInPanel = '';


  setMapElement(element) {
    this.mapElement = element;
  }

  @action addNewRectangule() {
    const rectangule = new SingleRectanguleModel();
    this.rectangules.push(rectangule);
    this.setActivePanel(rectangule.id);
  }

  @action addFirstRectangule() {
    if (this.rectangules.length === 0) {
      this.addNewRectangule();
    }
  }

  @action setActivePanel(id) {
    this.rectangules.forEach((rec) => {
      if (rec.id === id) {
        rec.makeActiveInPanel(true);
        return;
      }
      rec.makeActiveInPanel(false);
    });
  }

}
export default GoldenRectangulesModel;
