import { observable, action, observe, autorunAsync, toJS, computed } from 'mobx';
import SingleRectanguleModel from 'models/SingleGoldenRectanguleModel';
import { storeDataToLocalStore, getDataFromLocalStore } from 'lib/localStorage';

export class GoldenRectangulesModel {
  mapElement;
  @observable rectangules = [];
  @observable activeInPanel = '';

  constructor() {
    /* Save rectangules data to localStorage */
    autorunAsync(() => {
      const params = this.rectangulesParameters;
      if (params) {
        storeDataToLocalStore('rectangules', toJS(params));
      }
    }, 500);
  }

  setMapElement(element) {
    this.mapElement = element;
  }

  @computed get rectangulesParameters() {
    if (this.rectangules.length) {
      return this.rectangules.map(rec => {
        return {
          props: rec.props,
          name: rec.name,
        };
      });
    }
    return false;
  }

  @action recoverFromLs() {
    const propsFromLs = getDataFromLocalStore('rectangules');
    if (!propsFromLs) {
      return;
    }
    propsFromLs.forEach(rec => this.addNewRectangule(rec));
  }

  @action addNewRectangule({ name, props = null }) {
    const rectangule = new SingleRectanguleModel(name, props);
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
