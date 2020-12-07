import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Platform,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

function SplashScreen() {
  // MARK: - Screen Focus Hooks

  React.useLayoutEffect(() => {
    StatusBar.setBarStyle('dark-content', false);

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', false);
      StatusBar.setTranslucent(true);
    }
  });

  // MARK: -

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <SafeAreaView style={styles.container}>
        <ActivityIndicator />
      </SafeAreaView>
    </>
  );
}

export default SplashScreen;
