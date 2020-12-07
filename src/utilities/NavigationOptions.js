import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {
  SYSTEM_COLOR_ORANGE,
  SYSTEM_COLOR_BLACK,
  SYSTEM_COLOR_PURPLE,
} from '../assets/colors';

const NAVIGATION_TYPE_DEFAULT = undefined;
const NAVIGATION_TYPE_CLEAR = 'clear';
const NAVIGATION_TYPE_LIGHT = 'white';
const NAVIGATION_TYPE_PURPLE = 'purple';

export const styles = StyleSheet.create({
  headerBackground: {
    height: '100%',
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 15,
  },
  headerTitleStyle: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-black' : undefined,
    color: '#1D1E1F',
  },
});

function NavigationOptions(props) {
  const tintColor = '#3F414E';
  let backgroundColor = SYSTEM_COLOR_ORANGE;

  if (props?.barStyle === NAVIGATION_TYPE_CLEAR) {
    backgroundColor = 'transparent';
  } else if (props?.barStyle === NAVIGATION_TYPE_PURPLE) {
    backgroundColor = SYSTEM_COLOR_PURPLE;
  }

  let objects = {
    headerBackground: () => (
      <View
        style={[
          styles.headerBackground,
          {
            backgroundColor,
            // shadowOpacity:
            //   props?.barStyle === NAVIGATION_TYPE_DEFAULT ? 0.0 : 0.1,
            // elevation: props?.barStyle === NAVIGATION_TYPE_DEFAULT ? 0 : 4,
          },
        ]}
      />
    ),
    headerTitleStyle: {
      ...styles.headerTitleStyle,
      color: tintColor,
    },
    headerTintColor: tintColor,
    headerBackImage: () => (
      <View
        style={{
          borderColor: '#EBEAEC',
          borderWidth: 1,
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 20,
          marginLeft: Platform.select({ios: 20, android: 6}),
        }}>
        <Icon
          name={props?.showCancel ? 'x' : 'arrow-left'}
          size={20}
          color={tintColor}
          // style={{marginLeft: Platform.select({ios: 20, android: 6})}}
        />
      </View>
    ),
    headerBackTitleVisible: false,
    headerPressColorAndroid: '#C1C1C1',
    // ...TransitionPresets.ScaleFromCenterAndroid,
  };

  if (props?.animationStyle === 'modal') {
    objects = {
      headerShown: false,
      animationEnabled: false,
      cardStyle: {
        backgroundColor: 'transparent',
      },
      cardOverlayEnabled: false,
      gestureEnabled: false,
    };
  }

  return objects;
}

export default NavigationOptions;
