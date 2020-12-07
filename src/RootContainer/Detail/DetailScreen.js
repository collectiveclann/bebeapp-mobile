import * as React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeArea} from 'react-native-safe-area-context';

import {
  BaseComponent,
  ButtonComponent,
  LabelComponent,
  InputComponent,
  CenterComponent,
  TableSectionHeader,
} from '../../assets/components';

import HeaderImage from './HeaderImage';
import BabyImage from './BabyImage';

import {SCREEN_WIDTH} from '../../assets/constants';
import {SYSTEM_COLOR_GRAY_LIGHT} from '../../assets/colors';
// import {AppLogoLaunch} from '../../assets/icons';

const styles = StyleSheet.create({
  termsButton: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    marginBottom: 20,
    marginHorizontal: 35,
  },
});

function CalculateScreen({route, navigation}) {
  const [phone, setPhone] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const logoValue = new Animated.Value(0);

  // MARK: -

  const insets = useSafeArea();

  // MARK: - Keyboar Listeners

  const logoOpacity = logoValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  // MARK: - Buttons Life Cycle

  async function handleSendButton() {}

  // MARK: - View Lifecycle

  return (
    <BaseComponent
      {...{route, navigation, style: 'dark'}}
      backgroundColor="white">
      <View
        style={{
          position: 'absolute',
          width: SCREEN_WIDTH,
          height: SCREEN_WIDTH * 0.77,
          overflow: 'hidden',
          backgroundColor: 'red',
          borderBottomRightRadius: 33,
          borderBottomLeftRadius: 33,
        }}>
        <HeaderImage size={SCREEN_WIDTH} />
      </View>

      <ScrollView style={{height: '100%', width: '100%'}}>
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
              02 Nisan 2021
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
            <TableSectionHeader title="Koç Burcu" m={0} p={0} />

            <LabelComponent mt={10} textSize={18} lineHeight="22px">
              Enerjisi yüksek, odaklı, hevesli ve neşeli bir bebek olacaktır.
              Hızla odaklanabildiği gibi çabucak dikkati dağılabilir. Bu nedenle
              oyun oynarken bir nesneye uzun süre odaklanamayabilir. Sabır güçlü
              olduğu yanlardan biri değildir. Çabuk tepki verebilir.
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
            <TableSectionHeader
              title="Geçen Yıl Aynı Tarihte Doğan Bebek Sayısı"
              m={0}
              p={0}
            />

            <LabelComponent mt={10} textSize={18} lineHeight="22px">
              10945 bebek aynı tarihte dünyaya geldi.
            </LabelComponent>

            <TableSectionHeader
              title="En Çok Verilen Erkek İsmi"
              m={0}
              p={0}
              mt={15}
            />

            <LabelComponent mt={10} textSize={18} lineHeight="22px">
              Kerem
            </LabelComponent>
          </View>

          <ButtonComponent
            type="success"
            mt={35}
            mb={20}
            onPress={handleSendButton}
            loading={loading}>
            Yeni Hesapla
          </ButtonComponent>
        </CenterComponent>
      </ScrollView>
    </BaseComponent>
  );
}

export default CalculateScreen;
