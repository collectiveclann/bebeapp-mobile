import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

export default function TermsOfIcon({size, color}) {
  return (
    <Svg viewBox="0 0 23.14 23.74" width={size} height={size}>
      <Path
        fill={color}
        d="M17.09,12.17H6a1,1,0,1,1,0-2H17.09a1,1,0,1,1,0,2Z"
      />
      <Path fill={color} d="M17.09,17.4H6a1,1,0,0,1,0-2H17.09a1,1,0,0,1,0,2Z" />
      <Path
        fill={color}
        d="M16.52,2.12A4.58,4.58,0,0,1,21.1,6.7v10a4.58,4.58,0,0,1-4.58,4.58h-10A4.59,4.59,0,0,1,2,16.67V6.7A4.59,4.59,0,0,1,6.54,2.12h10m0-2h-10A6.56,6.56,0,0,0,0,6.7v10a6.56,6.56,0,0,0,6.54,6.55h10a6.56,6.56,0,0,0,6.54-6.55V6.7A6.56,6.56,0,0,0,16.52.15Z"
      />
      <Rect x="1.06" y="5.08" width="20.94" height="1.96" />
    </Svg>
  );
}
