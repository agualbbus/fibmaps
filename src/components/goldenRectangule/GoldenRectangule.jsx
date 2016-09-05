import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import radium from 'radium';
import styler from 'react-styling';
import makeRgbClr from 'lib/makeRgbClr';
import SvgRectangule from 'components/goldenRectangule/SvgRectangule';

@radium
@observer
export default class GoldenRectangule extends Component {
  componentDidMount() {
    this.props.rectanguleModel.createOverlayAction(
      this.props.rectanguleModel.id,
      ReactDOM.findDOMNode(this.refs.container)
    );
  }

  render() {
    const { props, id, pixelsWidth, isActive } = this.props.rectanguleModel;
    const dinamicStyles = {
      transform: `rotateZ(${props.trnfrm.rot.z}deg) rotateX(${props.trnfrm.rot.x}deg) rotateY(${props.trnfrm.rot.y}deg)`,
      transformOrigin: 'left bottom',
      width: pixelsWidth,
      visibility: props.show === true ? 'visible' : 'hidden',
    };

    const activeBorderClr = { borderColor: makeRgbClr(props.colors.activeLayerBorder.rgb) };
    const activeLayer = (<div style={[styles.activeLayer, activeBorderClr]} />);

    return (
      <div style={[styles.container, dinamicStyles]} ref="container" className="GoldenRectangule" id={id}>
        <SvgRectangule model={this.props.rectanguleModel} ref="svg" />
        { isActive ? activeLayer : null }
      </div>
    );
  }
}

GoldenRectangule.propTypes = {
  rectanguleModel: React.PropTypes.object.isRequired,
};

const styles = styler`
  container
    background-color: transparent
    position: absolute
    top:0
    left: 0
    width: 350px
    z-index: 999
    display: none
    cursor: move

  activeLayer
    position: absolute
    left: -25%
    top: -25%
    bottom: -25%
    right: -25%
    border-width: 2px
    border-style: dashed
`;