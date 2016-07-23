import React, { Component } from 'react';
import SvgRectangule from 'components/goldenRectangule/SvgRectangule';

export default class GoldenRectangule extends Component {
  render() {
    return (
      <SvgRectangule />
    );
  }
}

GoldenRectangule.propTypes = {
  model: React.PropTypes.object.isRequired,
};
