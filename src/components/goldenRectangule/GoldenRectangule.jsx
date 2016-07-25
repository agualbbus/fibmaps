import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import styler from 'react-styling';
import SvgRectangule from 'components/goldenRectangule/SvgRectangule';
import createOverlay from 'lib/googleMapsOverlayHandler';

@observer
export default class GoldenRectangule extends Component {
  componentDidMount() {
    this.overlay = createOverlay(this.props.rectanguleModel.id, ReactDOM.findDOMNode(this.refs.container));
  }

  render() {
    return (
      <div style={styles.container} ref="container">
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
