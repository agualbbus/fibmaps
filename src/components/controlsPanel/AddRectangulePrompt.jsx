import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Modal from 'react-bootstrap/lib/Modal';

@observer
export default class AddRectangulePrompt extends Component {

  constructor() {
    super();
    this.state = {
      inputValue: null,
    };
  }

  _submitHandler(e) {
    e.preventDefault();
    this.props.modalSubmit(this.state.inputValue);
  }

  _handleInputChng(e) {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    return (
      <div>
        <Modal show={this.props.showModal}>
          <Modal.Header>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this._submitHandler.bind(this)}>
              <div className="row">
                <div className="col-xs-12">
                    <div className="form-group">
                      <label>Golden Name</label>
                      <input className="form-control" type="text" required onChange={this._handleInputChng.bind(this)} />
                    </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                    <div className="form-group">
                      <button className="btn" type="submit">Create</button>
                    </div>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

AddRectangulePrompt.propTypes = {
  showModal: React.PropTypes.bool.isRequired,
  modalSubmit: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
};
