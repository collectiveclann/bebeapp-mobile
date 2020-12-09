import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import {onScrollEvent} from 'react-native-redash';
import {PageControlJaloro} from 'react-native-chi-page-control';

import {AuthContext} from '../model';

import {LabelComponent, TouchableComponent} from '../assets/components';
import {SYSTEM_COLOR_ORANGE, SYSTEM_COLOR_YELLOW} from '../assets/colors';
import {SCREEN_WIDTH, SCREEN_PADDING_2} from '../assets/constants';

import IntroList from './IntroModel';
import IntroRow from './IntroRow';

const {interpolate, Extrapolate, Value} = Animated;

const x = new Value(0);

const IntroScreen = () => {
  const {firstLaunch} = React.useContext(AuthContext);

  // MARK: -

  const scrollRef = React.useRef();
  const [pageIndex, setPageIndex] = React.useState(0);

  // MARK: -

  const backButtonOpacity = interpolate(x, {
    inputRange: [SCREEN_WIDTH / 2, SCREEN_WIDTH],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
    useNativeDriver: true,
  });

  // MARK: -

  const scrollTo = (index) => {
    if (scrollRef.current && scrollRef.current.getNode) {
      const node = scrollRef.current.getNode();
      if (node) {
        node.scrollTo({x: SCREEN_WIDTH * index, y: 0, animated: true});
      }
    }
  };

  // MARK: - View Liftcycle

  return (
    <SafeAreaView
      style={{
        height: '100%',
        width: '100%',
      }}>
      <Animated.ScrollView
        ref={scrollRef}
        style={{
          height: '100%',
          width: '100%',
        }}
        horizontal={true}
        pagingEnabled={true}
        contentSize={SCREEN_WIDTH * IntroList.length}
        contentContainerStyle={{
          flexDirection: 'row',
        }}
        scrollEventThrottle={1}
        onScroll={(event) => {
          const xPosition = event.nativeEvent.contentOffset.x;

          onScrollEvent({x: xPosition});

          const index = Math.floor(
            xPosition / (SCREEN_WIDTH - SCREEN_PADDING_2),
          );

          if (index !== pageIndex) {
            setPageIndex(index > 0 ? index : 0);
          }
        }}
        onMomentumScrollEnd={(event) => {}}
        showsHorizontalScrollIndicator={false}>
        {IntroList.map((item, index) => {
          return (
            <IntroRow
              key={`IntroScreen_${index.toString()}`}
              {...{item, index}}
            />
          );
        })}
      </Animated.ScrollView>

      <View
        style={{
          flexDirection: 'row',
          height: 60,
          width: '100%',
          paddingHorizontal: 35,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 40,
            width: 60,
          }}>
          {pageIndex === 0 ? null : (
            <Animated.View style={{opacity: backButtonOpacity}}>
              <TouchableComponent
                borderless={true}
                style={{
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  scrollTo(pageIndex - 1);
                }}>
                <LabelComponent fontSize={16} fontWeight="700">
                  Geri
                </LabelComponent>
              </TouchableComponent>
            </Animated.View>
          )}
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <PageControlJaloro
            progress={pageIndex / (IntroList.length - 1)}
            numberOfPages={IntroList.length}
            animationDuration={300}
            inactiveTransparency={1}
            inactiveTintColor="#dfdfdf"
            activeTintColor={SYSTEM_COLOR_YELLOW}
          />
        </View>

        <View
          style={{
            height: 40,
            width: 60,
          }}>
          <TouchableComponent
            borderless={true}
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              if (pageIndex === IntroList.length - 1) {
                firstLaunch(false);
              } else {
                scrollTo(pageIndex + 1);
              }
            }}>
            <LabelComponent fontSize={16} fontWeight="700">
              {pageIndex === IntroList.length - 1 ? 'Bitti' : 'İleri'}
            </LabelComponent>
          </TouchableComponent>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default IntroScreen;
