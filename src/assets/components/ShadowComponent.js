import {View} from 'react-native';
import styled from 'styled-components';
import {space, shadow} from 'styled-system';

const ShadowComponent = styled(View)(
  {
    shadowColor: '#585858',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: undefined,
    shadowRadius: 7,
    elevation: 2,
  },
  space,
  shadow,
);

export default ShadowComponent;
