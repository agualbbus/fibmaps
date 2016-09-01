import { observable, action, observe } from 'mobx';
import SingleRectanguleModel from 'models/SingleGoldenRectanguleModel';

export class GoldenRectangulesModel {
  mapElement;
  @observable rectangules = [];
  @observable activeInPanel = '';


  setMapElement(element) {
    this.mapElement = element;
  }

  @action addNewRectangule(name) {
    const rectangule = new SingleRectanguleModel(name);
    this.rectangules.push(rectangule);
    this.setActive(rectangule.id);

    // add observer to react to change in makeActive panel
    observe(rectangule, (change) => {
      if (change.object.isActive === true) {
        this.setActive(change.object.id);
      }
    });
  }

  @action addFirstRectangule() {
    if (this.rectangules.length === 0) {
      this.addNewRectangule();
    }
  }

  @action setActive(id) {
    // setActive false for every panel exept for active
    this.rectangules.forEach((rec) => {
      if (rec.id === id) {
        return;
      }
      rec.makeActiveAction(false);
    });
  }

}
export default GoldenRectangulesModel;
