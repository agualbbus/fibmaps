import { observable, action, extendObservable} from 'mobx';
import firebaseUIconfig from 'constants/firebaseUIconfig';


export class CurrentUserModel {
  @observable user = null;

  constructor() {
    this.firebaseUIconfig = Object.assign(firebaseUIconfig, {
      callbacks: this.uiCallbacks,
    });
  }

  uiCallbacks = {
    signInSuccess: (user) => {
      this.user = user;
      return false;
    },
  }
}

export default CurrentUserModel;
