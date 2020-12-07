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
} from '../../assets/components';

import CalculateImage from './CalculateImage';

import {SCREEN_WIDTH} from '../../assets/constants';
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

  React.useEffect(() => {
    Keyboard.addListener('keyboardWillShow', keyboardDidShow);
    Keyboard.addListener('keyboardWillHide', keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardWillShow', keyboardDidShow);
      Keyboard.removeListener('keyboardWillHide', keyboardDidHide);
    };
  });

  const keyboardDidShow = (e) => {
    Animated.timing(logoValue, {
      toValue: 1,
      duration: e.duration - 100,
      easing: Easing.Keyboard,
      delay: 0,
      useNativeDriver: true,
    }).start(() => {});
  };

  const keyboardDidHide = (e) => {
    Animated.timing(logoValue, {
      toValue: 0,
      duration: e.duration + 100,
      easing: Easing.Keyboard,
      delay: 0,
      useNativeDriver: true,
    }).start(() => {});
  };

  const logoOpacity = logoValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  // MARK: - Buttons Life Cycle

  async function handleNextButton() {
    navigation.navigate('DetailScreen');
  }

  // MARK: - View Lifecycle

  return (
    <BaseComponent
      {...{route, navigation, style: 'dark'}}
      safeAreaInsets={true}
      backgroundColor="white">
      <CenterComponent
        style={{
          position: 'absolute',
          width: SCREEN_WIDTH,
          height: SCREEN_WIDTH * 1.33,
        }}>
        <View
          style={{
            position: 'absolute',
            paddingBottom: 50,
          }}>
          <CalculateImage size={SCREEN_WIDTH - 100} />
        </View>
      </CenterComponent>

      <ScrollView
        contentContainerStyle={{
          flex: 1,
          height: '100%',
          width: '100%',
          justifyContent: 'flex-end',
        }}>
        <CenterComponent
          pl={35}
          pr={35}
          pt={SCREEN_WIDTH * 0.9}
          pb={50}
          onLayout={(e) => {
            // setLogoHeight(e.nativeEvent.layout.y);
          }}>
          <View
            style={{
              width: '100%',
            }}>
            <LabelComponent
              fontSize={18}
              fontWeight="700"
              textAlign="center"
              pl={50}
              pr={50}
              mb={15}>
              Doğum Yapacağınız Tarihi Hesaplayın
            </LabelComponent>

            <InputComponent
              icon="heart"
              placeholder="Bir Yöntem Seçin"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCompleteType="email"
              mt={20}
              // value={eMail}
              // onChangeText={setEMail}
            />

            <InputComponent
              icon="message-circle"
              placeholder="E-posta Adresi"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCompleteType="email"
              mt={20}
              // value={eMail}
              // onChangeText={setEMail}
            />
          </View>

          <ButtonComponent
            type="success"
            mt={35}
            mb={20}
            onPress={handleNextButton}
            loading={loading}>
            Şimdi Öğren
          </ButtonComponent>
        </CenterComponent>
      </ScrollView>

      {/* <TouchableComponent
        activeOpacity={0.9}
        style={styles.termsButton}
        height={50}
        borderRadius={25}
        borderless={true}
        onPress={() =>
          navigation.navigate('SupportScreen', {
            title: 'Sözleşmeler',
            uri: 'http://www.helalapp.com/sozlesme',
          })
        }>
        <LabelComponent fontSize={12} fontWeight="400" textAlign="center">
          HelalApp kullanarak &apos;Hizmet Şartları&apos; ve &apos;Gizlilik
          Politikası&apos;nı kabul etmiş olursun.
        </LabelComponent>
      </TouchableComponent> */}
    </BaseComponent>
  );
}

export default CalculateScreen;
