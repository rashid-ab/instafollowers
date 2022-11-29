import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/Navigation'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/redux/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App({navigation}) {
 const store = createStore(reducer);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
    // <Text>hjggh</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
