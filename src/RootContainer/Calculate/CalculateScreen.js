import * as React from 'react';
import {View, Platform, ActionSheetIOS} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Feather';
import Animated from 'react-native-reanimated';
import {onScrollEvent} from 'react-native-redash';

import {
  BaseComponent,
  ButtonComponent,
  LabelComponent,
  InputComponent,
  CenterComponent,
  TouchableComponent,
} from '../../assets/components';
import {SCREEN_WIDTH} from '../../assets/constants';
import {SYSTEM_COLOR_YELLOW} from '../../assets/colors';

import CalculateImage from './CalculateImage';

const {interpolate, Extrapolate, Value} = Animated;

const y = new Value(0);

function CalculateScreen({route, navigation}) {
  const [type, setType] = React.useState(-1);
  const [method, setMethod] = React.useState('');
  const [dateTitle, setDateTitle] = React.useState('');
  const [isShowLoop, setShowLoop] = React.useState(false);

  const [date, setDate] = React.useState('');
  const [loop, setLoop] = React.useState('28');

  // MARK: - DateTimePickerModal
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

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

  // MARK: -

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const cancelDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (d) => {
    setDate(d);
    hideDatePicker();
  };

  moment.locale('tr');

  // MARK: -

  const insets = useSafeArea();

  // MARK: -  Buttons

  const handleMethodButton = () => {
    const buttonList = ['Son Adet Dönemim', 'Hamile Kaldığım Tarih', 'Kapat'];

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: 'Hesaplama Yöntemi',
          message: 'Hesaplama yapabilmek için lütfen bir yöntem seçin',
          options: buttonList,
          cancelButtonIndex: buttonList.length - 1,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            setType(1);
            setDateTitle('Son Adet Döneminin İlk Günü');
            setShowLoop(true);
            setMethod(buttonList[buttonIndex]);
          } else if (buttonIndex === 1) {
            setType(2);
            setDateTitle('Hamile Kaldığım Tarih');
            setShowLoop(false);
            setMethod(buttonList[buttonIndex]);
          }
        },
      );
    } else {
    }
  };

  const handleDateButton = () => {
    setDatePickerVisibility(true);
  };

  // MARK: - Buttons Life Cycle

  async function handleNextButton() {
    if (type < 0) {
      navigation.navigate('AlertScreen', {
        title: 'Yöntem Seçimi',
        message:
          'Bebeğinizin doğum tarihini öğrenmek için bir yöntem seçmelisiniz.',
      });

      return;
    }

    let duration = '';
    let result = '';

    if (type === 1) {
      //
      duration = moment(date).fromNow();
      result = moment(date)
        .add(252 + parseInt(loop), 'days')
        .calendar();
    }

    if (type === 2) {
      duration = moment(date).fromNow();
      result = moment(date).add(266, 'days').calendar();
    }

    navigation.navigate('DetailScreen', {
      duration,
      result,
    });
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
            paddingBottom: 50,
          }}>
          <CalculateImage size={SCREEN_WIDTH - 100} />
        </View>
      </Animated.View>

      <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={onScrollEvent({y})}
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
        }}>
        <View
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH * 1,
          }}
        />

        <CenterComponent pl={35} pr={35}>
          <View
            style={{
              width: '100%',
            }}>
            <LabelComponent
              fontSize={22}
              fontWeight="700"
              textAlign="center"
              pl={50}
              pr={50}
              mb={15}>
              Doğum Yapacağınız Tarihi Hesaplayın
            </LabelComponent>

            <TouchableComponent
              mt={30}
              onPress={handleMethodButton}
              borderRadius={30}
              overflow="hidden">
              <InputComponent
                icon="heart"
                placeholder={method.length === 0 ? 'Yöntem Seçin' : 'Yöntem'}
                inputProps={{
                  editable: false,
                }}
                value={method}
              />
            </TouchableComponent>

            {method !== '' ? (
              <TouchableComponent
                mt={20}
                onPress={handleDateButton}
                borderRadius={30}
                overflow="hidden">
                <InputComponent
                  icon="calendar"
                  placeholder={dateTitle}
                  inputProps={{
                    editable: false,
                  }}
                  value={date !== '' ? moment(date).format('DD MMM YYYY') : ''}
                />
              </TouchableComponent>
            ) : null}

            {isShowLoop && date !== '' ? (
              <View
                style={{
                  marginTop: 20,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <InputComponent
                  icon="activity"
                  placeholder="Adet Döngü Süresi"
                  inputProps={{
                    editable: false,
                  }}
                  value={loop}
                />

                <View
                  style={{
                    position: 'absolute',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    zIndex: 99,
                    width: '100%',
                    height: '100%',
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                  }}>
                  <TouchableComponent
                    onPress={() => {
                      if (parseInt(loop) > 21) {
                        setLoop(`${parseInt(loop) - 1}`);
                      }
                    }}
                    style={{
                      backgroundColor: SYSTEM_COLOR_YELLOW,
                      height: 32,
                      width: 32,
                      borderRadius: 16,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon name="minus" size={19} />
                  </TouchableComponent>

                  <TouchableComponent
                    onPress={() => {
                      if (parseInt(loop) < 40) {
                        setLoop(`${parseInt(loop) + 1}`);
                      }
                    }}
                    style={{
                      backgroundColor: SYSTEM_COLOR_YELLOW,
                      height: 32,
                      width: 32,
                      borderRadius: 16,
                      marginLeft: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon name="plus" size={19} />
                  </TouchableComponent>
                </View>
              </View>
            ) : null}
          </View>

          <ButtonComponent
            type="success"
            mt={35}
            mb={20}
            onPress={handleNextButton}>
            Şimdi Öğren
          </ButtonComponent>
        </CenterComponent>

        <View style={{height: insets.bottom}} />
      </Animated.ScrollView>

      <DateTimePickerModal
        headerTextIOS={dateTitle}
        cancelTextIOS="Vazgeç"
        confirmTextIOS="Seç"
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={cancelDatePicker}
      />
    </BaseComponent>
  );
}

export default CalculateScreen;
