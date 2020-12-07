import * as React from 'react';
import {
  View,
  Animated,
  Easing,
  Platform,
  DeviceEventEmitter,
  StyleSheet,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {flexbox, space, layout, size} from 'styled-system';

import LabelComponent from './LabelComponent';
import TouchableComponent from './TouchableComponent';
import SeparatorComponent from './SeparatorComponent';

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

export const Alert = (params) => {
  DeviceEventEmitter.emit('AlertEventEmitter', params);
};

const dismiss = () => {
  DeviceEventEmitter.emit('AlertDismissEventEmitter');
};

const AlertButton = (params) => {
  return (
    <View>
      {params?.nonBorder === true ? null : <SeparatorComponent />}

      <TouchableComponent
        activeOpacity={0.75}
        onPress={() => {
          dismiss();

          setTimeout(() => {
            if (params?.onPress) {
              params?.onPress();
            }
          }, 500);
        }}
        style={{
          height: 50,
          borderRadius: params?.nonBorder === true && !params?.buttons ? 25 : 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LabelComponent
          fontSize={16}
          fontWeight={params.type === 'destructive' ? '600' : '500'}
          color={params.type === 'destructive' ? '#EB5757' : '#181818'}>
          {params.title}
        </LabelComponent>
      </TouchableComponent>
    </View>
  );
};

const contentValue = new Animated.Value(0);
const alertValue = new Animated.Value(0);

function AlertComponent() {
  const [params, setParams] = React.useState();
  const [isShowing, setIsShowing] = React.useState(false);

  const buttonList = [
    ...(params?.buttons || []),
    {
      title: params?.cancelButtonTitle || 'Kapat',
      onPress: params?.cancelOnPress,
      nonBorder: params?.fullScreen === true && !params?.buttons,
    },
  ];

  // MARK: -

  const alertEventEmitter = (v) => {
    setParams(v);
    setIsShowing(true);
    startAnimation(true);
  };

  const alertDismissEventEmitter = (v) => {
    setIsShowing(false);
  };

  React.useLayoutEffect(() => {
    DeviceEventEmitter.addListener('AlertEventEmitter', alertEventEmitter);

    DeviceEventEmitter.addListener(
      'AlertDismissEventEmitter',
      alertDismissEventEmitter,
    );

    return () => {
      DeviceEventEmitter.removeListener('AlertEventEmitter', null);
      DeviceEventEmitter.removeListener('AlertDismissEventEmitter', null);
    };
  });

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
          dismiss();
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

  if (isShowing !== true) {
    return null;
  }

  return (
    <FullSizeContent justifyContent="center" alignItems="center">
      <FullSizeContent
        backgroundColor={params?.fullScreen === true ? 'white' : '#0000002F'}
        opacity={contentOpacity}
      />

      {params?.fullScreen === true ? null : (
        <RectButton
          rippleColor="transparent"
          underlayColor="transparent"
          activeOpacity={1}
          onPress={dismiss}
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
          borderRadius: 23,
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
            <LabelComponent
              fontSize={17}
              fontWeight="700"
              fontFamily={
                Platform.OS === 'android' ? 'sans-serif-medium' : undefined
              }
              textAlign="center"
              mt={params?.image ? 20 : 30}>
              {params?.title}
            </LabelComponent>
          ) : null}

          {/* -- Message -- */}
          <LabelComponent
            fontSize={15}
            lineHeight="22px"
            textAlign="center"
            mt={10}
            mb={30}
            pl={25}
            pr={25}
            color="#282828">
            {params?.message}
          </LabelComponent>

          {/* -- Buttons -- */}
          {(buttonList || []).map((item) => (
            <AlertButton {...item} />
          ))}
        </View>
      </Animated.View>
    </FullSizeContent>
  );
}

export default AlertComponent;
