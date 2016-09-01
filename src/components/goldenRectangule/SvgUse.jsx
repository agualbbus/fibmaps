import React, { Component } from 'react';
import radium from 'radium';
import { observer } from 'mobx-react';

@observer
@radium
export default class SvgUse extends Component {
  render() {
    const id = `${this.props.model.id}-l${this.props.id + 1}`;
    const xlinkHref = `#${this.props.model.id}-l${this.props.id}`;
    return (
      <use id={id} xlinkHref={xlinkHref} transform="rotate(90 1 1) translate(0,.382) scale(.618)" style={this.props.style} />
    );
  }
}

SvgUse.propTypes = {
  model: React.PropTypes.object.isRequired,
  id: React.PropTypes.number.isRequired,
  style: React.PropTypes.object.isRequired,
};
