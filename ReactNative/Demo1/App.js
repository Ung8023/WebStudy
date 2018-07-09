/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View >
        <Text style={styleDef.bigblue}>
          Welcome to React Native!
        </Text>
        <Text style={styleDef.bigblue}>
          To get started, edit App.js
        </Text>
        <Text style={styleDef.red}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styleDef = StyleSheet.create({
    bigblue: {
        color: 'blue',
        fontWeight:'bold',
        fontSize:30,
    },

    red: {
        color: 'red',
    },

});

AppRegistry.registerComponent('App', () => App)