import * as React from 'react';
import {View, Animated, Easing, Platform, StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {flexbox, space, layout, size} from 'styled-system';

import {navigationRef} from '../../model/NavigationContext';

import {
  LabelComponent,
  TouchableComponent,
  SeparatorComponent,
} from '../components';
import {SYSTEM_COLOR_ORANGE} from '../colors';

const FullSizeContent = styled(Animated.View)(
  {
    ...StyleSheet.absoluteFill,
    height: '100%',
    width: '100%',
  },
  space,
  flexbox,
  layout,
  size,
);

// MARK: -

const AlertButton = (props) => {
  return (
    <View {...props}>
      {props?.nonBorder === true ? null : <SeparatorComponent />}

      <TouchableComponent
        activeOpacity={0.75}
        onPress={() => {
          navigationRef.current?.goBack();

          setTimeout(() => {
            if (props?.onPress) {
              props?.onPress();
            }
          }, 500);
        }}
        style={{
          height: 50,
          borderRadius: props?.nonBorder === true && !props?.buttons ? 25 : 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LabelComponent
          fontSize={17}
          fontWeight={
            props?.type === 'destructive' || props?.type === 'cancel'
              ? '700'
              : '500'
          }
          color={props?.type === 'destructive' ? '#EB5757' : '#181818'}>
          {props?.title}
        </LabelComponent>
      </TouchableComponent>
    </View>
  );
};

const contentValue = new Animated.Value(0);
const alertValue = new Animated.Value(0);

function AlertComponent({route: {params}, navigation}) {
  const buttonList = [
    ...(params?.buttons || []),
    {
      title: params?.cancelButtonTitle || 'Kapat',
      onPress: params?.cancelOnPress,
      nonBorder: params?.fullScreen === true && !params?.buttons,
      type: 'cancel',
    },
  ];

  // MARK: -

  const startAnimation = (v) => {
    Animated.parallel([
      Animated.timing(contentValue, {
        toValue: 1,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(alertValue, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.poly(4)),
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (v === false) {
        setTimeout(() => {
          params.navigation?.dismiss();
        }, 300);
      }
    });
  };

  const contentOpacity = contentValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const alertOpacity = alertValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  React.useLayoutEffect(() => {
    startAnimation();
  });

  return (
    <FullSizeContent justifyContent="center" alignItems="center">
      <FullSizeContent
        backgroundColor={params?.fullScreen === true ? 'white' : 'transparent'}
        opacity={contentOpacity}
      />

      {params?.fullScreen === true ? null : (
        <RectButton
          rippleColor="transparent"
          underlayColor="transparent"
          activeOpacity={1}
          onPress={params.navigation?.dismiss}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            borderRadius: 36,
          }}
        />
      )}

      <Animated.View
        style={{
          opacity: alertOpacity,
          width: '75%',
          backgroundColor: 'white',
          borderRadius: 19,
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: params?.fullScreen === true ? 0 : 0.05,
          shadowRadius: 10,
          // elevation: 1,
        }}>
        <View
          style={{
            borderRadius: 23,
            overflow: 'hidden',
          }}>
          {/* -- Image -- */}
          {params?.image ? (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingTop: 20,
              }}>
              {params?.image}
            </View>
          ) : null}

          {/* -- Title -- */}
          {params?.title ? (
            <View
              style={{
                // minHeight: 60,
                paddingTop: 20,
                paddingBottom: 10,
                // borderColor: 'red',
                // borderWidth: 1,
                marginTop: params?.image ? 20 : 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <LabelComponent
                fontSize={17}
                fontWeight="700"
                fontFamily={
                  Platform.OS === 'android' ? 'sans-serif-medium' : undefined
                }
                color={SYSTEM_COLOR_ORANGE}
                textAlign="center">
                {params?.title}
              </LabelComponent>
            </View>
          ) : null}

          {/* -- Message -- */}
          {params?.message ? (
            <LabelComponent
              fontSize={15}
              lineHeight="22px"
              textAlign="center"
              // mt={10}
              mb={20}
              pl={25}
              pr={25}
              color="#282828">
              {params?.message}
            </LabelComponent>
          ) : null}

          {/* -- Buttons -- */}
          {(buttonList || []).map((item, index) => (
            <AlertButton key={`AlertButton_${index.toString()}`} {...item} />
          ))}
        </View>
      </Animated.View>
    </FullSizeContent>
  );
}

export default AlertComponent;
