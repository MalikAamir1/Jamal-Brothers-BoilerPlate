import React, {useEffect, useState} from 'react';
import {
  LogBox,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import StackNavigator from './src/Navigators/Stack';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {Store} from './src/Store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  LogBox.ignoreLogs([
    "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types",
    'ColorPropType will be removed',
    'Failed prop type',
    'VirtualizedLists should never be nested',
  ]);

  LogBox.ignoreAllLogs();
  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={Store}>
        <PaperProvider>
          <StackNavigator />
        </PaperProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
