import * as React from 'react';
import {View, DeviceEventEmitter} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useSafeArea} from 'react-native-safe-area-context';

// MARK: -

export const BottomSheet = (params) => {
  DeviceEventEmitter.emit('BottomSheetEventEmitter', params);
};

export const BottomSheetDismiss = () => {
  DeviceEventEmitter.emit('BottomSheetDismissEventEmitter');
};

const bottomSheetRef = React.createRef();

function BottomSheetComponent() {
  const [params, setParams] = React.useState();
  const [isShowing, setIsShowing] = React.useState(false);

  // MARK: -

  const insets = useSafeArea();

  // MARK: -

  const bottomSheetEventEmitter = (v) => {
    if (v.isHidden !== true) {
      setParams(v);
      setIsShowing(true);
      startAnimation(true);
    } else {
      setParams(null);

      bottomSheetRef.current?.close();

      startAnimation(false);
    }
  };

  React.useLayoutEffect(() => {
    DeviceEventEmitter.addListener(
      'BottomSheetEventEmitter',
      bottomSheetEventEmitter,
    );

    return () => {
      DeviceEventEmitter.removeListener('BottomSheetEventEmitter', null);
    };
  });

  // MARK: -

  const startAnimation = (v) => {
    setTimeout(() => {
      if (bottomSheetRef.current) {
        if (v === true) {
          bottomSheetRef.current?.open();
        } else {
          setIsShowing(false);
        }
      }
    }, 500);
  };

  const contentComponent = () => {
    return params?.contentComponent() || null;
  };

  const footerComponent = () => {
    return (
      <View style={{paddingBottom: insets.bottom}}>
        {params?.footerComponent}
      </View>
    );
  };

  if (isShowing !== true) {
    return null;
  }

  return (
    <Modalize
      ref={bottomSheetRef}
      overlayStyle={{backgroundColor: 'rgba(0, 0, 0, 0.45)'}}
      scrollViewProps={{showsVerticalScrollIndicator: false}}
      adjustToContentHeight={true}
      HeaderComponent={params?.headerComponent}
      withHandle={params?.withHandle || true}
      FooterComponent={footerComponent}
      onClosed={() => {
        setIsShowing(false);
      }}>
      {contentComponent()}
    </Modalize>
  );
}

export default BottomSheetComponent;
