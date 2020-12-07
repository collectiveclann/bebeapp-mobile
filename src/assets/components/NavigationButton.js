import * as React from 'react';
import {View, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components';
import {variant, space, layout, border, flexbox} from 'styled-system';

import LabelComponent from './LabelComponent';
import TouchableComponent from './TouchableComponent';

const ViewContent = styled(View)(
  {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 34,
    maxWidth: 90,
    height: '100%',
    borderRadius: 6,
    // paddingTop: 2,
    // borderColor: 'white',
    // borderWidth: 1,
  },
  variant({
    prop: 'type',
    variants: {
      clear: {
        backgroundColor: 'transparent',
      },
      dark: {
        backgroundColor: '#FFFFFF80',
      },
    },
  }),
  space,
  layout,
  border,
  flexbox,
);

const ButtonNavigationComponent = (props) => {
  const content = () => {
    if (props?.loading === true) {
      return <ActivityIndicator color="white" />;
    } else if (props?.text) {
      return (
        <LabelComponent
          fontSize={15}
          fontWeight="600"
          textAlign="center"
          color={props?.color || 'white'}>
          {props?.text}
        </LabelComponent>
      );
    } else {
      return props?.icon ? (
        <Icon
          name={props?.icon}
          size={props?.size || 22}
          color={props?.color || 'white'}
        />
      ) : (
        props?.children
      );
    }
  };
  return (
    <TouchableComponent
      {...props}
      borderless={true}
      onPress={() => {
        if (props?.onPress) {
          props?.onPress();
        }
      }}>
      <ViewContent type={props?.type || 'clear'}>{content()}</ViewContent>
    </TouchableComponent>
  );
};

export default ButtonNavigationComponent;
