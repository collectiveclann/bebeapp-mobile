import * as React from 'react';
import {
  SafeAreaProvider,
  initialWindowSafeAreaInsets,
} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {AppState, DeviceEventEmitter} from 'react-native';

import {AuthContext} from './src/model';
import {navigationRef} from './src/model/NavigationContext';

import {RootContainer, SplashScreen, IntroContainer} from './src';

function App() {
  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(
    appState.current,
  );

  React.useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  // MARK: -

  const initialState = {
    isLoading: true,
    // isSignout: false,
    isShowTutorial: true,
    // userToken: null,
  };

  const reducer = (prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          // userToken: action.token,
          isShowTutorial: action.isShowTutorial,
          isLoading: false,
        };
      // case 'SIGN_IN':
      //   return {
      //     ...prevState,
      //     isSignout: false,
      //     userToken: action.token,
      //   };
      // case 'SIGN_OUT':
      //   return {
      //     ...prevState,
      //     isSignout: true,
      //     userToken: undefined,
      //   };
    }
  };

  const [userState, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      // let userToken;
      let isShowTutorial;
      try {
        // userToken = await AsyncStorage.getItem('userToken');
        isShowTutorial = await AsyncStorage.getItem('isShowTutorial');

        if (isShowTutorial === null) {
          isShowTutorial = true;
        }

        // if (userToken) {
        //   if (userToken !== 'null') {
        //     setUser(JSON.parse(userToken));
        //   }
        // }
      } catch (e) {
        // Restoring token failed
      }

      // if (userToken) {
      //   if (userToken !== 'null') {
      //     dispatch({
      //       type: 'RESTORE_TOKEN',
      //       token: userToken,
      //       isShowTutorial: 'false',
      //     });
      //   }
      // } else {
      dispatch({
        type: 'RESTORE_TOKEN',
        // token: null,
        isShowTutorial,
      });
      // }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      // signIn: async (data) => {
      //   const userData = JSON.stringify(data);
      //   await AsyncStorage.setItem('userToken', userData);

      //   setUser(data);

      //   // MARK: -

      //   // setTimeout(() => initPushManager(), 3000);

      //   // MARK: -

      //   dispatch({type: 'SIGN_IN', token: userData});
      // },
      // signOut: async () => {
      //   await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);

      //   // MARK: -

      //   // deinit();

      //   // MARK: -

      //   dispatch({type: 'SIGN_OUT'});
      // },
      // signUp: async (data) => {
      //   dispatch({type: 'SIGN_IN', token: JSON.stringify(data)});
      // },
      firstLaunch: async (data) => {
        await AsyncStorage.setItem('isShowTutorial', 'false');

        // MARK: -

        dispatch({type: 'RESTORE_TOKEN', isShowTutorial: 'false'});
      },
    }),
    [],
  );

  // MARK: -

  if (userState.isLoading) {
    return <SplashScreen />;
  }

  console.log('====================================');
  console.log(userState.isShowTutorial);
  console.log('====================================');
  return (
    <>
      <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer ref={navigationRef}>
            {userState.isShowTutorial === true ? (
              <IntroContainer />
            ) : (
              <RootContainer />
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </SafeAreaProvider>
    </>
  );
}

export default App;
