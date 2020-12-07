import * as React from 'react';
import {Dimensions, ActivityIndicator, Platform} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {variant, flexbox, space, layout, size} from 'styled-system';

import LabelComponent from './LabelComponent';
import {SYSTEM_COLOR_YELLOW, SYSTEM_COLOR_BLACK_LIGHT} from '../colors';

const ButtonContent = styled(RectButton)(
  {
    height: 54,
    width: Dimensions.get('window').width - 70,
    overflow: 'hidden',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  space,
  flexbox,
  layout,
  size,
  variant({
    prop: 'type',
    variants: {
      success: {
        backgroundColor: SYSTEM_COLOR_YELLOW,
      },
      transparent: {
        backgroundColor: 'transparent',
      },
      info: {
        backgroundColor: '#673ab7',
      },
      error: {
        backgroundColor: '#52A75D',
      },
    },
  }),
);

const ButtonComponent = (props) => {
  return (
    <ButtonContent
      type={props?.type}
      {...props}
      rippleColor="#C1C1C1"
      underlayColor="#C1C1C1"
      activeOpacity={0.85}
      onPress={() => {
        if (props?.loading !== true) {
          props?.onPress();
        }
      }}>
      {props?.loading === true ? (
        <ActivityIndicator color="white" />
      ) : (
        <LabelComponent
          fontSize={props?.fontSize || 17}
          fontWeight={props?.fontWeight || '700'}
          fontFamily={
            Platform.OS === 'android' ? 'sans-serif-medium' : undefined
          }
          textAlign="center"
          color={
            props?.type === 'transparent' ? SYSTEM_COLOR_BLACK_LIGHT : 'white'
          }>
          {props?.children}
        </LabelComponent>
      )}
    </ButtonContent>
  );
};

export default ButtonComponent;
