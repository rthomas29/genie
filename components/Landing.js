import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default class Landing extends Component {
  render() {
    return (
      <View>
        <Icon type="font-awesome" name="gift" size={40} color="#19B5FE" reverse raised />
      </View>
    );
  }
}
