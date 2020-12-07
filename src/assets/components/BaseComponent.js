import * as React from 'react';
import {StatusBar, Platform, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import styled from 'styled-components';

const MainContent = styled(SafeAreaView)({
  flex: 1,
});

const Content = styled(View)({
  flex: 1,
});

function BaseComponent(props) {
  const {route, navigation, style} = props;

  // MARK: - Screen Focus Hooks

  React.useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StatusBar.setBarStyle(
        style === 'dark' ? 'dark-content' : 'light-content',
        false,
      );

      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent', false);
        StatusBar.setTranslucent(true);
      }
    });

    return unsubscribe;
  }, [navigation, route, style]);

  React.useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // setLoading(false);
      // MARK: -
      // cancelConnection();
    });

    return unsubscribe;
  }, [navigation]);

  // MARK: -

  return props?.safeAreaInsets === true ? (
    <MainContent {...props}>{props?.children}</MainContent>
  ) : (
    <Content {...props}>{props?.children}</Content>
  );
}

export default BaseComponent;
