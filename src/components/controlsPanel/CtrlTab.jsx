import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styler from 'react-styling';


@observer
export default class CtrlTab extends Component {
  render() {
    const model = this.props.rectanguleModel;
    return (
      <li style={styles.li}>Rectangule</li>
    );
  }
}

CtrlTab.propTypes = {
  rectanguleModel: React.PropTypes.object.isRequired,
};

const styles = styler `
  li
    list-style: none
    background: #3c3c3a
    display: inline-block
    padding: 3px 5px 0
    height: 25px
    min-width: 84px
    text-align: center
    border-top-left-radius: 3px
    border-top-right-radius: 4px
    border-bottom: 1px solid #5d5d5d
`;
