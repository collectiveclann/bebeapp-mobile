import * as React from 'react';
import {Platform} from 'react-native';

import LabelComponent from './LabelComponent';
import ButtonComponent from './ButtonComponent';
import CenterComponent from './CenterComponent';

const EmptyState = ({...props}) => (
  <CenterComponent flex={1} {...props}>
    {props?.image}

    <LabelComponent
      fontSize={15}
      fontWeight="700"
      fontFamily={Platform.OS === 'android' ? 'sans-serif-medium' : undefined}
      mt={props?.image ? 30 : 0}
      color={props?.style === 'dark-content' ? '#FFF' : '#212121'}>
      {props?.title}
    </LabelComponent>
    <LabelComponent
      mt={10}
      ml={50}
      mr={50}
      fontSize={15}
      textAlign="center"
      color={props?.style === 'dark-content' ? '#FFF' : '#212121'}>
      {props?.description}
    </LabelComponent>

    {props?.buttonTitle ? (
      <ButtonComponent
        type="success"
        mt={35}
        onPress={props?.onPress}
        loading={props?.loading}>
        {props?.buttonTitle}
      </ButtonComponent>
    ) : null}
  </CenterComponent>
);

export default EmptyState;
