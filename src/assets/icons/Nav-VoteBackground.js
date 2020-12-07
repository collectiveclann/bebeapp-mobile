import * as React from 'react';
import Svg, {
  Path,
  G,
  Defs,
  Filter,
  FeFlood,
  FeColorMatrix,
  FeOffset,
  FeGaussianBlur,
  FeBlend,
} from 'react-native-svg';

export default function NavVoteBackground({color, size}) {
  return (
    <Svg width="56" height="53" viewBox="0 0 56 53" fill="none">
      <Path
        d="M34.2369 7.66938C40.6287 5.83176 47 10.6294 47 17.2801V34C47 39.5228 42.5228 44 37 44H17C11.4772 44 7 39.5228 7 34V23.0301C7 18.5714 9.95182 14.6514 14.2369 13.4194L34.2369 7.66938Z"
        fill={color || 'white'}
        fillOpacity="0.4"
      />
      <Path
        d="M34.306 7.90965C40.538 6.11796 46.75 10.7957 46.75 17.2801V34C46.75 39.3848 42.3848 43.75 37 43.75H17C11.6152 43.75 7.25 39.3848 7.25 34V23.0301C7.25 18.6829 10.128 14.8608 14.306 13.6597L34.306 7.90965Z"
        fill={color || 'white'}
        strokeWidth="0.5"
      />
    </Svg>
  );
}
