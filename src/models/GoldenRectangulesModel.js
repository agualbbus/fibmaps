import { observable, action, observe } from 'mobx';
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

    // add observer to react to change in makeActive panel
    observe(rectangule, (change) => {
      if (change.object.isActiveInPanel === true) {
        this.setActivePanel(change.object.id);
      }
    });
  }

  @action addFirstRectangule() {
    if (this.rectangules.length === 0) {
      this.addNewRectangule();
    }
  }

  @action setActivePanel(id) {
    // setActivePanel false for every panel exept for active
    this.rectangules.forEach((rec) => {
      if (rec.id === id) {
        return;
      }
      rec.makeActiveInPanel(false);
    });
  }

}
export default GoldenRectangulesModel;
