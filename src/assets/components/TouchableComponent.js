import * as React from 'react';
import {RectButton, BorderlessButton} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {flexbox, space, layout, size, color} from 'styled-system';

const TouchableContent = styled(RectButton)(
  space,
  layout,
  size,
  flexbox,
  color,
);

const TouchableWithoutBorderContent = styled(BorderlessButton)(
  space,
  layout,
  size,
  flexbox,
  color,
);

const TouchableComponent = (props) => {
  return props?.borderless === true ? (
    <TouchableWithoutBorderContent
      {...props}
      underlayColor={props?.underlayColor || '#f1f1f1'}
      rippleColor={props?.rippleColor || '#D9D9D9'}
      activeOpacity={0.85}
    />
  ) : (
    <TouchableContent
      {...props}
      underlayColor={props?.underlayColor || '#f1f1f1'}
      rippleColor={props?.rippleColor || '#D9D9D9'}
      activeOpacity={0.85}
    />
  );
};

export default TouchableComponent;
