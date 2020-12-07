import * as React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Dimensions,
  Animated,
  ActionSheetIOS,
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

import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";

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
  const [method, setMethod] = React.useState('Bir Yöntem Seçin');
  const [date, setDate] = React.useState(new Date());
  const [dateSelected, setDateSelected] = React.useState(false);
  
  // MARK: - DateTimePickerModal
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const cancelDatePicker = () => {
    setDateSelected(false);
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateSelected(true);
    setDate(date);
    hideDatePicker();
  };

  moment.locale('tr');
  // MARK: - DateTimePickerModal

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

  const handleNavigationButton = () => {
    console.log('xxxxx');
  };

  onFocus = () => {
    handleMethodButton()
    // do something
  }

  const handleMethodButton = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Kapat', 'Hamile Kaldığım Tarih'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            // Keyboard.dismiss();
            setMethod('Bir Yöntem Seçin'); 
          } else if (buttonIndex === 1) {
            setMethod('Hamile Kaldığım gün'); 
            // Keyboard.dismiss();
          } 
        },
      );
    } else {
      
    }
  };
  
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

            <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
            <InputComponent
              icon="heart"
              placeholder={method}
              textContentType="emailAddress"
              autoCompleteType="email"
              mt={20}
              onFocus={handleMethodButton}
              onKeyPress={Keyboard.dismiss()}
              // value={eMail}
              // onChangeText={setEMail}
            />
            </TouchableWithoutFeedback>
            

            <InputComponent
              icon="message-circle"
              placeholder= {dateSelected ? moment(date).format('DD MMM YYYY') : "Tarih Seçin"}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCompleteType="email"
              mt={20}
              onFocus={showDatePicker}
              onKeyPress={Keyboard.dismiss()}
              // onFocus = {this.showPicker.bind(this, 'simple', { date: this.state.simpleDate })}
              // value={eMail}
              // onChangeText={setEMail}
            />
            
            <DateTimePickerModal
              headerTextIOS="Tarih Seçin"
              cancelTextIOS="Vazgeç"
              confirmTextIOS="Seç"
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={cancelDatePicker}
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
