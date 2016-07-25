import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { goldenRectangulesModel } from 'models';
import GoldenRectangule from 'components/goldenRectangule/GoldenRectangule';

@observer
export default class GoldenRectangulesWrapper extends Component {
  render() {
    const rectangules = goldenRectangulesModel.rectangules.map((rect, key) =>
    <GoldenRectangule
      key={key}
      rectanguleModel={rect}
    />);
    return (
      <div>
        { rectangules }
      </div>
    );
  }
}
