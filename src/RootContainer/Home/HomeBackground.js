import * as React from 'react';
import Svg, {Path, G, Defs, Rect, ClipPath} from 'react-native-svg';

export default function HomeBackground({size}) {
  return (
    <Svg width={size} height={size * 1.33} viewBox="0 0 375 447" fill="none">
      <G clip-path="url(#clip0)">
        <Path
          d="M-3 -17V333.912C-3 333.912 26.5941 397.043 102.681 389.717C178.768 382.391 194.548 342.934 286.415 415.654C286.415 415.654 318.824 446.088 378 444.97V-17H-3Z"
          fill="#FAF8F5"
        />
        <Path
          d="M359.174 447C312.372 447 284.638 425.414 284.342 425.166C228.887 381.58 194.892 389.892 147.853 401.413C135.377 404.468 122.463 407.63 107.738 410.282C35.7706 423.259 0.355102 385.511 0 385.12L0.875919 384.327C1.21919 384.706 36.256 421.969 107.513 409.121C122.214 406.469 135.093 403.32 147.557 400.265C194.928 388.673 229.148 380.301 285.064 424.242C285.408 424.514 319.06 450.682 374.87 445.011L374.988 446.183C369.508 446.751 364.229 447 359.174 447Z"
          fill="#F9F0E3"
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="375" height="447" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}