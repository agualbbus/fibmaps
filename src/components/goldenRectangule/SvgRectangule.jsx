import React, { Component } from 'react';
import styler from 'react-styling';
import radium from 'radium';
import { observer } from 'mobx-react';
import makeRgbClr from 'lib/makeRgbClr';
import SvgUse from 'components/goldenRectangule/SvgUse';

@observer
@radium
export default class SvgRectangule extends Component {
  render() {
    const colors = this.props.model.props.colors;
    const pathStyle = { stroke: makeRgbClr(colors.spiral.rgb) };
    const gId = `${this.props.model.id}-l0`;
    const useGroup = new Array(7).fill(0).map((use, key) =>
      <SvgUse
        model={this.props.model}
        id={key}
        key={key}
        style={pathStyle}
      />
    );

    return (
      <div>
       {colors ?
        <svg style={[styles.svg]} version="1.2" fill="none" strokeLinecap="square" viewBox="-.01 -.01 1.64 1.02">
          <g id={gId} >
          <path style={[styles.path, pathStyle]} d="M -1,0 A 1,1 0 0 1 0,-1" transform="translate(1,1)" vectorEffect="non-scaling-stroke" strokeWidth="5" />
          <rect style={[styles.path, pathStyle]} width="1" height="1" vectorEffect="non-scaling-stroke" />
          </g>
          { useGroup }
        </svg>
        : null }
      </div>
    );
  }
}

SvgRectangule.propTypes = {
  model: React.PropTypes.object.isRequired,
};


const styles = styler `
  svg
    stroke-width: 0.4
  path
    stroke-opacity: 1
    stroke-width: 1.5
    fill: none
`;
