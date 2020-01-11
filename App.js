/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Root } from 'native-base';

// import AuthScreen from './AuthScreen';
import AppNavigator from "./src";

const App = () => {
  return (
    <Root>
      <AppNavigator/>
    </Root>
  );
};

export default App;
