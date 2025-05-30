/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import {ChildProvider} from './src/context/ChildContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <ChildProvider>
        <AppNavigator />
      </ChildProvider>
    </SafeAreaProvider>
  );
};

export default App;
