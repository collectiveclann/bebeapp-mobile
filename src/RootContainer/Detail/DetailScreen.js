import * as React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
  Easing,
} from 'react-native';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeArea} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import {onScrollEvent} from 'react-native-redash';

import {
  BaseComponent,
  ButtonComponent,
  LabelComponent,
  CenterComponent,
  TableSectionHeader,
} from '../../assets/components';

import HeaderImage from './HeaderImage';
import BabyImage from './BabyImage';

import {SCREEN_WIDTH} from '../../assets/constants';
import {SYSTEM_COLOR_GRAY_LIGHT} from '../../assets/colors';
// import {AppLogoLaunch} from '../../assets/icons';

import {
  burcList,
  burcDetailList,
  kizNameList,
  erkekNameList,
} from './DetailModel';

const {interpolate, Extrapolate, Value} = Animated;

const y = new Value(0);

function CalculateScreen({route, navigation}) {
  const insets = useSafeArea();

  // MARK: -

  const IMAGE_HEIGHT = SCREEN_WIDTH;

  // MARK: -

  const position = interpolate(y, {
    inputRange: [0, SCREEN_WIDTH],
    outputRange: [0, -IMAGE_HEIGHT],
    extrapolate: Extrapolate.CLAMP,
  });

  // MARK: - Buttons Life Cycle

  async function handleBackButton() {
    navigation.goBack();
  }

  // MARK: -

  const getBurc = () => {
    const date = route.params.result.split('.');
    const day = parseInt(date[0]);
    const month = parseInt(date[1]) - 1;

    const burc = burcList[month];

    if (day < burc.day) {
      return burc.min;
    }
    return burc.max;
  };

  function capitalize(str) {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  }

  // MARK: - View Lifecycle

  return (
    <BaseComponent
      {...{route, navigation, style: 'dark'}}
      backgroundColor="white">
      <Animated.View
        style={{
          position: 'absolute',
          width: SCREEN_WIDTH,
          height: SCREEN_WIDTH * 0.77,
          overflow: 'hidden',
          backgroundColor: 'red',
          borderBottomRightRadius: 33,
          borderBottomLeftRadius: 33,
          transform: [{translateY: position}],
        }}>
        <HeaderImage size={SCREEN_WIDTH} />
      </Animated.View>

      <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={onScrollEvent({y})}
        style={{height: '100%', width: '100%'}}>
        <CenterComponent
          pl={20}
          pr={20}
          pt={SCREEN_WIDTH * 0.9}
          pb={50}
          onLayout={(e) => {
            // setLogoHeight(e.nativeEvent.layout.y);
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <BabyImage size={60} />

            <LabelComponent
              fontSize={24}
              fontWeight="700"
              textAlign="center"
              pl={50}
              pr={50}
              mt={10}>
              {moment(route.params.result, 'DD.MM.YYYY').format('LL')}
            </LabelComponent>
          </View>

          <View
            style={{
              backgroundColor: SYSTEM_COLOR_GRAY_LIGHT,
              width: '100%',
              padding: 20,
              borderRadius: 23,
              marginTop: 40,
            }}>
            <TableSectionHeader
              title={`${getBurc()} Burcu`}
              fontSize={19}
              m={0}
              p={0}
            />

            <LabelComponent mt={10} fontSize={17} lineHeight="24px">
              {burcDetailList[getBurc()].aciklama}
            </LabelComponent>

            <LabelComponent mt={20} fontSize={18} lineHeight="22px">
              <LabelComponent fontWeight="700" fontSize={18} lineHeight="22px">
                Element :
              </LabelComponent>
              {` ${burcDetailList[getBurc()].element}`}
            </LabelComponent>

            <LabelComponent mt={15} fontSize={18} lineHeight="22px">
              <LabelComponent fontWeight="700" fontSize={18} lineHeight="22px">
                Gezegen :
              </LabelComponent>
              {` ${burcDetailList[getBurc()].gezegen}`}
            </LabelComponent>
          </View>

          <View
            style={{
              backgroundColor: SYSTEM_COLOR_GRAY_LIGHT,
              width: '100%',
              padding: 20,
              borderRadius: 23,
              marginTop: 20,
            }}>
            <TableSectionHeader title="İsim Önerisi" m={0} p={0} mt={15} />

            <LabelComponent mt={20} fontSize={18} lineHeight="22px">
              <LabelComponent fontWeight="700" fontSize={18} lineHeight="22px">
                Kız :
              </LabelComponent>
              {` ${capitalize(
                kizNameList[
                  Math.floor(Math.random() * (kizNameList.length - 0 + 1)) + 0
                ],
              )}`}
            </LabelComponent>

            <LabelComponent mt={15} fontSize={18} lineHeight="22px">
              <LabelComponent fontWeight="700" fontSize={18} lineHeight="22px">
                Erkek :
              </LabelComponent>
              {` ${capitalize(
                erkekNameList[
                  Math.floor(Math.random() * (kizNameList.length - 0 + 1)) + 0
                ],
              )}`}
            </LabelComponent>
          </View>

          <ButtonComponent
            type="success"
            mt={35}
            mb={20}
            onPress={handleBackButton}>
            Yeni Hesapla
          </ButtonComponent>
        </CenterComponent>
      </Animated.ScrollView>
    </BaseComponent>
  );
}

export default CalculateScreen;
