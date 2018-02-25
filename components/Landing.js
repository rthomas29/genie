import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon, Text, Button } from 'react-native-elements';
import { styles } from '../App';

export default class Landing extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text h2>genie</Text>
        <Button raised icon={{ name: 'cached' }} title="Login" onPress={() => alert('hello')} />
      </View>
    );
  }
}
