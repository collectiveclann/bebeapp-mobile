import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Host} from 'react-native-portalize';

import HomeScreen from './Home/HomeScreen';
import CalculateScreen from './Calculate/CalculateScreen';
import DetailScreen from './Detail/DetailScreen';

import {NavigationOptions} from '../utilities';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// const TabContainer = ({navigation, route}) => {
//   return (
//     <Host>
//       <Tab.Navigator
//         tabBar={(props) => <TabBarContainer {...props} />}
//         tabBarOptions={{
//           lazy: true,
//         }}
//         shifting={true}>
//         <Tab.Screen name="Feed" component={FeedContainer} />
//         <Tab.Screen name="Map" component={MapContainer} />
//         <Tab.Screen name="ShoppingCart" component={ShoppingCartContainer} />
//       </Tab.Navigator>
//     </Host>
//   );
// };

function PushContainer() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={() => ({
          ...NavigationOptions({barStyle: 'clear'}),
          headerTransparent: true,
          title: null,
        })}
      />

      <Stack.Screen
        name="CalculateScreen"
        component={CalculateScreen}
        options={() => ({
          headerTitle: '',
          ...NavigationOptions({barStyle: 'clear'}),
          headerTransparent: true,
        })}
      />

      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={() => ({
          headerTitle: '',
          ...NavigationOptions({barStyle: 'clear'}),
          headerTransparent: true,
        })}
      />
    </Stack.Navigator>
  );
}

// function PushContainer() {
//   // MARK: - Tabbarın üzerinde konumlandırılacak push view yapısı

//   return (
//     <Stack.Navigator mode="card" screenOptions={{animationEnabled: false}}>
//       <Stack.Screen
//         name="TabContainer"
//         component={TabContainer}
//         options={() => ({
//           headerShown: false,
//         })}
//       />
//     </Stack.Navigator>
//   );
// }

function Container() {
  // MARK: - En üstte konumlandırılacak modal view yapısı

  return (
    <Stack.Navigator
      headerMode="none"
      mode="modal"
      screenOptions={{
        transparentCard: true,
        cardStyle: {backgroundColor: 'transparent', opacity: 1},
        cardOverlayEnabled: true,
        gestureEnabled: false,
      }}>
      <Stack.Screen
        name="PushContainer"
        component={PushContainer}
        options={() => ({
          headerShown: false,
        })}
      />

      {/* <Stack.Screen
        name="MenuSelectScreen"
        component={MenuSelectScreen}
        options={() => ({
          ...NavigationOptions({animationStyle: 'modal'}),
        })}
      />

      <Stack.Screen name="SigninContainer" component={SigninContainer} />

      <Stack.Screen
        name="SigninAlertScreen"
        component={SigninAlertScreen}
        options={() => ({
          ...NavigationOptions({animationStyle: 'modal'}),
        })}
      />

      <Stack.Screen name="ProfileContainer" component={ProfileContainer} />

      <Stack.Screen
        name="NotificationContainer"
        component={NotificationContainer}
      />

      <Stack.Screen name="SearchContainer" component={SearchContainer} />

      <Stack.Screen name="LocationContainer" component={LocationContainer} />

      <Stack.Screen
        name="PermissionContainer"
        component={PermissionContainer}
      />

      <Stack.Screen name="PaymentContainer" component={PaymentContainer} />

      <Stack.Screen
        name="AlertScreen"
        component={AlertScreen}
        options={() => ({
          headerShown: false,
          animationEnabled: false,
          cardStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.15)',
          },
          cardOverlayEnabled: true,
          gestureEnabled: false,
          cardStyleInterpolator: ({current: {progress}}) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.35],
                extrapolate: 'clamp',
              }),
            },
          }),
        })}
      /> */}
    </Stack.Navigator>
  );
}

export default Container;
