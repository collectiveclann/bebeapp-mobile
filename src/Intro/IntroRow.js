import React from 'react';
import {View} from 'react-native';

import {LabelComponent} from '../assets/components';
import {SYSTEM_COLOR_BLACK, SYSTEM_COLOR_ORANGE} from '../assets/colors';
import {SCREEN_WIDTH} from '../assets/constants';

const IntroRow = (props) => {
  const {item} = props;

  // MARK: -

  const contentWidth = SCREEN_WIDTH - 120;

  // MARK: - View Liftcycle

  return (
    <View
      {...props}
      style={{
        width: SCREEN_WIDTH,
        height: '100%',
        alignItems: 'center',
        paddingHorizontal: 50,
      }}>
      <View
        style={{
          width: SCREEN_WIDTH,
          height: (SCREEN_WIDTH / 3) * 2,
          alignItems: 'center',
        }}>
        <View
          style={{
            width: contentWidth,
            height: contentWidth,
            borderRadius: contentWidth / 2,
            position: 'absolute',
            bottom: -(contentWidth / 2),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {item.image}
        </View>
      </View>

      <View
        style={{
          height: contentWidth / 2,
        }}
      />

      <LabelComponent
        fontSize={19}
        fontWeight="700"
        textAlign="center"
        mt={50}
        color={SYSTEM_COLOR_ORANGE}>
        {item.title}
      </LabelComponent>

      <LabelComponent
        fontSize={16}
        fontWeight="500"
        textAlign="center"
        lineHeight="22px"
        color={SYSTEM_COLOR_BLACK}
        mt={15}>
        {item.description}
      </LabelComponent>
    </View>
  );
};

export default IntroRow;
