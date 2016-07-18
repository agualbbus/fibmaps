import React, { Component } from 'react';

export default class GoldenRectangule extends Component {
  render() {
    return (
      <h1>Hello, world.</h1>
    );
  }
}

GoldenRectangule.propTypes = {
  model: React.PropTypes.object.isRequired,
};
