import * as React from 'react';
import {Dimensions, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components';
import {variant, flexbox, space, layout, size} from 'styled-system';

import TouchableComponent from './TouchableComponent';
import LabelComponent from './LabelComponent';
import {SYSTEM_COLOR_GRAY, SYSTEM_COLOR_GREEN} from '../colors';

const Content = styled(View)(
  {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 35,
    paddingRight: 20,
    height: 54,
  },
  space,
  flexbox,
  layout,
  size,
);

const ButtonComponent = (props) => {
  return (
    <TouchableComponent onPress={props?.onPress}>
      <Content {...props}>
        {props?.icon || <Icon name={props?.iconName} size={22} />}

        <LabelComponent flex={1} fontSize={17} ml={15}>
          {props?.title}
        </LabelComponent>

        <Icon name="chevron-right" size={22} color={SYSTEM_COLOR_GRAY} />
      </Content>
    </TouchableComponent>
  );
};

export default ButtonComponent;
