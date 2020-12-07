import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import {variant} from 'styled-system';

const MainContent = styled(SafeAreaView)(
  {
    flex: 1,
    backgroundColor: '#FFF',
  },
  variant({
    prop: 'type',
    variants: {
      primary: {
        backgroundColor: '#F7F7F7',
      },
      secondary: {
        backgroundColor: '#1D1E1F',
      },
    },
  }),
);

export default MainContent;
