import * as React from 'react';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';
import {space, layout, border} from 'styled-system';

const ImageContent = styled(FastImage)(
  {
    height: '100%',
    width: '100%',
  },
  border,
  space,
  layout,
);

const ImageComponent = (props) => {
  return (
    <ImageContent
      {...props}
      source={{
        uri: props?.image || '',
        priority: FastImage.priority.high,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

export default ImageComponent;
