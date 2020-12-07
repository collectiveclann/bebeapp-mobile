import * as React from 'react';
import {View, DeviceEventEmitter, Animated, Easing} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

import LabelComponent from './LabelComponent';

// MARK: -

const errorNoConnectionRef = React.createRef(false);

export const getErrorNoConnection = () => {
  return errorNoConnectionRef.current || false;
};

export const setErrorNoConnection = (v) => {
  if (getErrorNoConnection() !== v) {
    errorNoConnectionRef.current = v;

    // MARK: - Emitter

    DeviceEventEmitter.emit('ErrorConnectionEventEmitter', v);
  }
};

// MARK: -

function ConnectionCheckComponent() {
  // const [isShowing, setIsShowing] = React.useState(
  //   getErrorNoConnection() || false,e
  // );

  // MARK: -

  const insets = useSafeArea();

  // MARK: -

  const errorConnectionEventEmitter = (v) => {
    if (v === true) {
      startAnimation(true);

      setTimeout(() => {
        setErrorNoConnection(false);

        startAnimation(false);
      }, 5000);
    } else {
      startAnimation(false);
    }
  };

  React.useLayoutEffect(() => {
    DeviceEventEmitter.addListener(
      'ErrorConnectionEventEmitter',
      errorConnectionEventEmitter,
    );

    return () => {
      DeviceEventEmitter.removeListener('ErrorConnectionEventEmitter', null);
    };
  });

  // MARK: -

  const animatedValue = new Animated.Value(0);

  const startAnimation = (v) => {
    Animated.timing(animatedValue, {
      toValue: v === true ? 1 : 0,
      duration: v === true ? 300 : 700,
      easing: Easing.elastic(0.8),
      useNativeDriver: true,
    }).start();
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-130, 0],
  });

  // MARK: -

  // if (isShowing === false) {
  //   return null;
  // }

  return (
    <Animated.View
      colors={['#F2F5FB', '#FFFFFF00']}
      style={{
        marginTop: insets.top + 10,
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{translateY}],
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          borderRadius: 13,
          alignItems: 'center',
          paddingVertical: 12,
          paddingHorizontal: 22,
          backgroundColor: '#D9412C',
          shadowColor: '#D9412C',
          shadowOffset: {width: 0, height: 6},
          shadowOpacity: 0.15,
          shadowRadius: 9,
          // opacity: translateY,
        }}>
        <Icon name="wifi-off" size={22} color="white" />

        <LabelComponent
          fontSize={16}
          fontWeight="600"
          color="white"
          ml={15}
          flex={1}>
          İnternet Bağlantısı Yok
        </LabelComponent>
      </View>
    </Animated.View>
  );
}

export default ConnectionCheckComponent;
