import * as React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components';
import {flexbox, space, layout, size} from 'styled-system';

import TouchableComponent from './TouchableComponent';
import LabelComponent from './LabelComponent';
import LoadingComponent from './LoadingComponent';

import {SYSTEM_COLOR_BLACK_LIGHT} from '../colors';

const Content = styled(View)(
  {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 35,
    paddingRight: 20,
  },
  space,
  flexbox,
  layout,
  size,
);

const ButtonComponent = (props) => {
  return (
    <Content {...props} style={props?.contentStyle}>
      {props?.loading === true ? (
        <View style={{flex: 1}}>
          <LoadingComponent height={28} width={140} />
        </View>
      ) : (
        <LabelComponent flex={1} fontSize={18} fontWeight="700">
          {props?.title}
        </LabelComponent>
      )}

      {props?.onPressAllButton ? (
        props?.loading === true ? (
          <LoadingComponent height={22} width={70} />
        ) : (
          <TouchableComponent
            borderless={true}
            onPress={props?.onPressAllButton}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LabelComponent
              fontSize={14}
              fontWeight="700"
              color={SYSTEM_COLOR_BLACK_LIGHT}>
              Tümü
            </LabelComponent>
            <View style={{width: 5}} />
            <Icon
              name="chevron-right"
              size={16}
              color={SYSTEM_COLOR_BLACK_LIGHT}
            />
          </TouchableComponent>
        )
      ) : null}
    </Content>
  );
};

export default ButtonComponent;
