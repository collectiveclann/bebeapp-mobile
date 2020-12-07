import * as React from 'react';

import CenterComponent from './CenterComponent';
import {SYSTEM_COLOR_YELLOW} from '../colors';

const CircleIcon = (props) => {
  return (
    <CenterComponent
      style={{
        width: 22,
        height: 22,
        backgroundColor: props?.backgroundColor || SYSTEM_COLOR_YELLOW,
        borderRadius: 100,
      }}>
      {props?.icon}
    </CenterComponent>
  );
};

export default CircleIcon;
