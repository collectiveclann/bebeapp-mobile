import * as React from 'react';
import {View, Text} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import {onScrollEvent} from 'react-native-redash';

import {
  BaseComponent,
  ButtonComponent,
  LabelComponent,
  CenterComponent,
} from '../../assets/components';
import {SCREEN_WIDTH} from '../../assets/constants';

import HomeBackground from './HomeBackground';
import HomeImage from './HomeImage';
import CCLogo from './CCLogo';

const {interpolate, Extrapolate, Value} = Animated;

const y = new Value(0);

function HomeScreen({route, navigation}) {
  const insets = useSafeArea();

  // MARK: -

  const IMAGE_HEIGHT = SCREEN_WIDTH * 1.33;

  // MARK: -

  const scale = interpolate(y, {
    inputRange: [-IMAGE_HEIGHT, 0],
    outputRange: [2, 1],
    extrapolateRight: Extrapolate.CLAMP,
  });

  const position = interpolate(y, {
    inputRange: [0, SCREEN_WIDTH],
    outputRange: [0, -IMAGE_HEIGHT],
    extrapolate: Extrapolate.CLAMP,
  });

  // MARK: - Buttons Life Cycle

  async function handleNextButton() {
    navigation.navigate('CalculateScreen');
  }

  // MARK: - View Lifecycle

  return (
    <BaseComponent
      {...{route, navigation, style: 'dark'}}
      backgroundColor="white">
      <Animated.View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          width: SCREEN_WIDTH,
          height: SCREEN_WIDTH * 1.23,
          transform: [{scale, translateY: position}],
        }}>
        <View
          style={{
            position: 'absolute',
          }}>
          <HomeBackground size={SCREEN_WIDTH} />
        </View>

        <View
          style={{
            position: 'absolute',
            paddingBottom: 50,
          }}>
          <HomeImage size={SCREEN_WIDTH - 100} />
        </View>
      </Animated.View>

      <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={onScrollEvent({y})}
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          // justifyContent: 'flex-end',
          justifyContent: 'flex-end',
        }}>
        <CenterComponent
          pl={35}
          pr={35}
          pt={SCREEN_WIDTH * 1.1 + insets.top}
          onLayout={(e) => {
            // setLogoHeight(e.nativeEvent.layout.y);
          }}>
          <View
            style={{
              width: '100%',
            }}>
            <LabelComponent
              fontSize={28}
              fontWeight="700"
              textAlign="center"
              mb={15}>
              Doğum Tarihi Hesaplayıcı
            </LabelComponent>
            <LabelComponent
              fontSize={15}
              lineHeight="22px"
              fontWeight="400"
              textAlign="center">
              ile bebeğinizle ne zaman karşılaşacağınız konusunda daha iyi bir
              fikir edinerek bu tarihe göre plan yapmaya başlayabilirsiniz.
            </LabelComponent>
          </View>

          <ButtonComponent
            type="success"
            mt={35}
            mb={35}
            onPress={handleNextButton}>
            Başla
          </ButtonComponent>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 10 + insets.bottom,
            }}>
            <Text
              style={{
                fontSize: 8,
                color: '#484848',
              }}>
              FROM
            </Text>
            <View style={{height: 2}} />
            <CCLogo size={100} />
          </View>
        </CenterComponent>
      </Animated.ScrollView>
    </BaseComponent>
  );
}

export default HomeScreen;
