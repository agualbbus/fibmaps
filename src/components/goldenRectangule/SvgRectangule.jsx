import React, { Component } from 'react';
import styler from 'react-styling';
import { observer } from 'mobx-react';

@observer
export default class SvgRectangule extends Component {
  render() {
    return (
      <div>
        <svg style={styles.svg} version="1.2" fill="none" strokeLinecap="square" viewBox="-.01 -.01 1.64 1.02">
          <g id="l0" >
          <path style={styles.path} d="M -1,0 A 1,1 0 0 1 0,-1" transform="translate(1,1)" vectorEffect="non-scaling-stroke" strokeWidth="5" />
          <rect width="1" height="1" vectorEffect="non-scaling-stroke" />
          </g>
          <use id="l1" xlinkHref="#l0" transform="rotate(90 1 1) translate(0,.382) scale(.618)" />
          <use id="l2" xlinkHref="#l1" transform="rotate(90 1 1) translate(0,.382) scale(.618)" />
          <use id="l3" xlinkHref="#l2" transform="rotate(90 1 1) translate(0,.382) scale(.618)" />
          <use id="l4" xlinkHref="#l3" transform="rotate(90 1 1) translate(0,.382) scale(.618)" />
          <use id="l5" xlinkHref="#l4" transform="rotate(90 1 1) translate(0,.382) scale(.618)" />
          <use id="l6" xlinkHref="#l5" transform="rotate(90 1 1) translate(0,.382) scale(.618)" />
          <use id="l7" xlinkHref="#l6" transform="rotate(90 1 1) translate(0,.382) scale(.618)" />
        </svg>
      </div>
    );
  }
}

const styles = styler `
  svg
    stroke: #F50000
    stroke-width: 0.4
  path
    stroke: rgb(0, 168, 255)
    stroke-opacity: 1
    stroke-width: 1.5
    fill: none
`;
