import * as React from 'react';
import {View, Animated, StyleSheet, Easing} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';
import {color, flexbox, space, layout, size} from 'styled-system';

const Content = styled(View)(space, flexbox, layout, size, color);

const LoadingComponent = ({...props}) => {
  const backgroundColor = '#F3F3F3';
  const highlightColor = '#FFFFFF';
  const speed = 1800;

  const animatedValue = new Animated.Value(0);

  React.useLayoutEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: speed,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-350, 350],
  });

  return (
    <Content
      {...props}
      style={{
        overflow: 'hidden',
        backgroundColor,
        borderRadius: props?.borderRadius || 5,
      }}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{translateX}],
          },
        ]}>
        <LinearGradient
          colors={[backgroundColor, highlightColor, backgroundColor]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{flex: 1}}
        />
      </Animated.View>
    </Content>
  );
};

export default LoadingComponent;
