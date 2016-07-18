import React, { Component } from 'react';
import StyleSheet from 'react-style';
import { observer } from 'mobx-react';

@observer
export default class SvgRectangule extends Component {
  render() {
    return (
      <div style=>
        <svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" strokeLineCap="square" viewBox="-.01 -.01 1.64 1.02">
          <g id="l0" >
          <path d="M -1,0 A 1,1 0 0 1 0,-1" transform="translate(1,1)" vector-effect="non-scaling-stroke" strokeWidth="5" />
          <rect width="1" height="1" vector-effect="non-scaling-stroke" />
          </g>
          <use id="l1" xlinkhref="#l0" transform="rotate(90 1 1) translate(0,.382) scale(.618)" />
          <use id="l2" xlinkhref="#l1" transform="rotate(90 1 1) translate(0,.382) scale(.618)" />
          <use id="l3" xlinkhref="#l2" transform="rotate(90 1 1) translate(0,.382) scale(.618)" />
          <use id="l4" xlinkhref="#l3" transform="rotate(90 1 1) translate(0,.382) scale(.618)" />
          <use id="l5" xlinkhref="#l4" transform="rotate(90 1 1) translate(0,.382) scale(.618)" />
          <use id="l6" xlinkhref="#l5" transform="rotate(90 1 1) translate(0,.382) scale(.618)" />
          <use id="l7" xlinkhref="#l6" transform="rotate(90 1 1) translate(0,.382) scale(.618)" />
        </svg>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  svg: {
      stroke: #F50000,
      stroke-width: 0.4,
  },
  path: {
      stroke: rgb(0, 168, 255),
      stroke-opacity: 1,
      stroke-width: 1.5,
      fill: none,
  }
});


SvgRectangule.propTypes = {
  mapsDiv: React.PropTypes.object.isRequired,
};
