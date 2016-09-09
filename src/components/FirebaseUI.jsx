import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import firebaseUILoader from 'lib/firebaseUILoader';
import { currentUserModel } from 'models';


@observer
export default class FirebaseUI extends Component {


  componentDidMount() {
    this.containerElem = ReactDOM.findDOMNode(this.refs.container);
    firebaseUILoader()
      .then((UI) => {
        const ui = this.ui = new UI.auth.AuthUI(window.firebase.auth());
        ui.start(this.containerElem, currentUserModel.firebaseUIconfig);
      });
  }


  render() {
    return (
      <div ref="container">

      </div>
    );
  }
}
