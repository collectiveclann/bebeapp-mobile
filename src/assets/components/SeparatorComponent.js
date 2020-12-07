import {View} from 'react-native';
import styled from 'styled-components';
import {space, color} from 'styled-system';

const SeparatorContent = styled(View)(
  {
    backgroundColor: '#f3f3f3',
    height: 1,
    width: '100%',
  },
  space,
  color,
);

export default SeparatorContent;
