import {Text, Platform} from 'react-native';
import styled from 'styled-components';
import {
  variant,
  space,
  typography,
  color,
  flexbox,
  border,
} from 'styled-system';
import {SYSTEM_COLOR_BLACK} from '../colors';

const LabelContent = styled(Text)(
  {
    color: SYSTEM_COLOR_BLACK,
    backgroundColor: 'transparent',
  },
  variant({
    prop: 'type',
    variants: {
      'screen-title': {
        fontSize: 28,
        fontWeight: '800',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-black' : undefined,
        marginLeft: 35,
        marginTop: 35,
        marginBottom: 20,
      },
      'screen-subtitle': {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-medium' : undefined,
        marginLeft: 35,
        marginTop: -20,
        marginBottom: 20,
        color: '#686868',
      },
      'screen-grouptitle': {
        fontSize: 14,
        fontWeight: '700',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-medium' : undefined,
      },
      'row-text': {
        fontSize: 17,
        fontWeight: '400',
        fontFamily:
          Platform.OS === 'android' ? 'sans-serif-regular' : undefined,
      },
    },
  }),
  space,
  typography,
  color,
  flexbox,
  border,
);

export default LabelContent;
