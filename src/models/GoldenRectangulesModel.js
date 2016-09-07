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
      if (this.rectangules.length > 0) {
        this.saveToLs();
      }
    }, 300);
  }

  setMapElement(element) {
    this.mapElement = element;
  }

  @computed get rectangulesParametersForLs() {
    return this.rectangules.map(rec => {
      return {
        props: rec.props,
        name: rec.name,
      };
    });
  }

  @action recoverFromLs() {
    return new Promise((resolve, reject) => {
      const rectagules = getDataFromLocalStore('rectangules');
      if (rectagules.length === 0) {
        reject(false);
      }
      rectagules.forEach(rec => this.addNewRectangule(rec));
      resolve(this.rectangules);
    });
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

  @action setActive(id) {
    // setActive false for every panel exept for active
    this.rectangules.forEach((rec) => {
      if (rec.id === id) {
        rec.isActive = true;
        return;
      }
      rec.makeActiveAction(false);
    });
  }

  @action removeRectangule(id) {
    // setActive false for every panel exept for active
    const recId = this.rectangules.findIndex(i => i.id === id);
    this.rectangules[recId].gmapsOverlay.setMap(null); // this removes from gMaps
    this.rectangules.splice(recId, 1);
    this.saveToLs();
    if (this.rectangules.length > 0) {
      this.setActive(this.rectangules[0].id);
    }
  }

  saveToLs() {
    storeDataToLocalStore('rectangules', toJS(this.rectangulesParametersForLs));
  }

}

export default GoldenRectangulesModel;
