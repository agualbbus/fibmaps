import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import radium from 'radium';
import styler from 'react-styling';
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
    const { props, id, pixelsWidth, isActiveInPanel } = this.props.rectanguleModel;
    const dinamicStyles = {
      transform: `rotateZ(${props.trnfrm.rot.z}deg) rotateX(${props.trnfrm.rot.x}deg) rotateY(${props.trnfrm.rot.y}deg)`,
      transformOrigin: 'left bottom',
      width: pixelsWidth,
      visibility: props.show === true ? 'visible' : 'hidden',
    };
    const activeLayer = (<div style={isActiveInPanel ? styles.activeLayer : null} />);

    return (
      <div style={[styles.container, dinamicStyles]} ref="container" className="GoldenRectangule" id={id}>
        <SvgRectangule />
        { activeLayer }
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
    border: 2px dashed rgb(223, 53, 66)
`;
