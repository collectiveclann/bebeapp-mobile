import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const userStateRef = React.createRef();

export const getUser = () => {
  return userStateRef.current;
};

export const setUser = (v) => {
  userStateRef.current = v;

  // MARK: -

  if (v) {
    const userData = JSON.stringify(v);
    AsyncStorage.setItem('userToken', userData);
  } else {
    AsyncStorage.removeItem('userToken');
  }
};
