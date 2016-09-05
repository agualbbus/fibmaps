import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styler from 'react-styling';
import { goldenRectangulesModel } from 'models';


@observer
export default class DelCtrl extends Component {
  _handleDeleteClick() {
    goldenRectangulesModel.removeRectangule(this.props.model.id);
  }

  render() {
    return (
      <div style={styles.delete} onClick={this._handleDeleteClick.bind(this)}>
          <i className="fa fa-ban" aria-hidden="true"></i> Delete Rectangule
      </div>
    );
  }
}

DelCtrl.propTypes = {
  model: React.PropTypes.object.isRequired,
};

const styles = styler `
  delete:
    font-size: 12px;
`;
