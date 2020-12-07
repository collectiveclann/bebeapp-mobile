import React from 'react';
import {Animated, Easing, View, TextInput} from 'react-native';
// import TextInputMask from 'react-native-text-input-mask';
import Icon from 'react-native-vector-icons/Feather';
// import {isValidNumber} from 'libphonenumber-js';

import styled from 'styled-components';
import {space} from 'styled-system';

import {
  SYSTEM_COLOR_BLACK,
  SYSTEM_COLOR_BLACK_LIGHT,
  SYSTEM_COLOR_GRAY_LIGHT,
  SYSTEM_COLOR_GRAY,
} from '../colors';

const Content = styled(View)(
  {
    flexDirection: 'row',
    backgroundColor: SYSTEM_COLOR_GRAY_LIGHT,
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  space,
);

const inputStyle = {
  height: '100%',
  width: '100%',
  flex: 1,
  fontSize: 17,
  fontWeight: '700',
  color: SYSTEM_COLOR_BLACK,
};

const InputContent = styled(TextInput)(inputStyle, space);
// const MaskInputContent = styled(TextInputMask)(inputStyle, space);

function InputComponent(props) {
  const titleValue = new Animated.Value(props?.value ? 1 : 0);
  const contentValue = new Animated.Value(props?.value ? 1 : 0);

  const [inputValue, setInputValue] = React.useState('');

  const startAnimation = (dismiss) => {
    Animated.parallel([
      Animated.timing(titleValue, {
        toValue: dismiss === true ? 0 : 1,
        duration: 450,
        easing: Easing.out(Easing.poly(4)),
        useNativeDriver: false,
      }),
      Animated.timing(contentValue, {
        toValue: dismiss === true ? 0 : 1,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {});
  };

  const titleSize = titleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [17, 14],
  });

  const titlePosition = titleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -11],
  });

  const largeTitleOpacity = titleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const smallTitleOpacity = titleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const contentPosition = contentValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 11],
  });

  const inputProps = {
    ...props?.inputProps,

    onFocus: () => {
      startAnimation();
    },
    onBlur: () => {
      const value = inputValue || props?.value;
      if (!value) {
        startAnimation(true);
      }
    },
  };

  const input = () => {
    // if (props?.keyboardType === 'phone-pad') {
    //   return (
    //     <MaskInputContent
    //       // {...props}
    //       placeholder={null}
    //       // {...inputProps}
    //       mask="+90 ([000]) [000] [00] [00]"
    //       dataDetectorTypes="phoneNumber"
    //       textContentType="telephoneNumber"
    //       autoCompleteType="tel"
    //       keyboardType="numeric"
    //       value={inputValue || props?.value}
    //       onChangeText={(formatted, extracted) => {
    //         setInputValue(extracted);

    //         if (props?.onChangeText) {
    //           props?.onChangeText({
    //             number: extracted,
    //             isValid: isValidNumber(formatted),
    //           });
    //         }
    //       }}
    //     />
    //   );
    // } else if (props?.mask) {
    //   return (
    //     <MaskInputContent
    //       placeholder={null}
    //       {...inputProps}
    //       mask={props?.mask}
    //       style={{padding: 0}}
    //       value={inputValue || props?.value}
    //       onChangeText={(formatted, extracted) => {
    //         setInputValue(extracted);

    //         if (props?.onChangeText) {
    //           props?.onChangeText(extracted);
    //         }
    //       }}
    //     />
    //   );
    // }

    return (
      <InputContent
        // {...props}
        placeholder={null}
        {...inputProps}
        style={{padding: 0}}
        value={inputValue || props?.value}
        onChangeText={(t) => {
          setInputValue(t);

          if (props?.onChangeText) {
            props?.onChangeText(t);
          }
        }}
      />
    );
  };

  return (
    <Content {...props}>
      {props?.icon ? (
        <View
          style={{
            height: 64,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name={props?.icon} size={20} color={SYSTEM_COLOR_GRAY} />
        </View>
      ) : (
        <View style={{height: 64, width: 20}} />
      )}

      <View style={{flex: 1, justifyContent: 'center'}}>
        <Animated.View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            transform: [{translateY: titlePosition}],
          }}>
          <Animated.Text
            style={{
              position: 'absolute',
              fontSize: titleSize,
              opacity: largeTitleOpacity,
              color: SYSTEM_COLOR_BLACK_LIGHT,
            }}>
            {props?.placeholder}
          </Animated.Text>
          <Animated.Text
            style={{
              position: 'absolute',
              fontSize: titleSize,
              opacity: smallTitleOpacity,
              color: SYSTEM_COLOR_BLACK_LIGHT,
            }}>
            {props?.placeholder}
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={{
            height: 40,
            padding: 0,
            marginBottom: 2,
            transform: [{translateY: contentPosition}],
          }}>
          {input()}
        </Animated.View>
      </View>
    </Content>
  );
}

export default InputComponent;
