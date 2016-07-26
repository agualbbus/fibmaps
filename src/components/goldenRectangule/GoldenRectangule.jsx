import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import radium from 'radium';
import styler from 'react-styling';
import SvgRectangule from 'components/goldenRectangule/SvgRectangule';
import createOverlay from 'lib/googleMapsOverlayHandler';

@radium
@observer
export default class GoldenRectangule extends Component {
  componentDidMount() {
    this.overlay = createOverlay(this.props.rectanguleModel.id, ReactDOM.findDOMNode(this.refs.container));
  }

  render() {
    const { props, id } = this.props.rectanguleModel;
    const transform = {
      transform: `rotateZ(${props.trnfrm.rot.z}deg) rotateX(${props.trnfrm.rot.x}deg) rotateY(${props.trnfrm.rot.y}deg)`,
      transformOrigin: 'left bottom',
    };

    return (
      <div style={[styles.container, transform]} ref="container" className="GoldenRectangule" id={id}>
        <SvgRectangule />
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
`;
