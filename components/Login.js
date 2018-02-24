import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text, FormInput, FormLabel, SocialIcon } from 'react-native-elements';
import { styles } from '../App';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Username</FormLabel>
        <FormInput onChangeText={text => this.setState({ username: text })} />
        <FormLabel>Password</FormLabel>
        <FormInput secureTextEntry={true} onChangeText={text => this.setState({ password: text })} />
        <SocialIcon
          style={styles.social}
          title="Sign In With Facebook"
          light={true}
          button
          type="facebook"
          onPress={() => this.props.navigation.navigate('WishList', { navigation: this.props.navigation.navigate })}
        />
        <SocialIcon
          style={styles.social}
          title="Sign In With Twitter"
          light={true}
          button
          type="twitter"
          onPress={() => this.props.navigation.navigate('WishList', { navigation: this.props.navigation.navigate })}
        />
        <SocialIcon
          style={styles.social}
          title="Sign In With Google"
          light={true}
          button
          type="google-plus-official"
          onPress={() => this.props.navigation.navigate('WishList', { navigation: this.props.navigation.navigate })}
        />
      </View>
    );
  }
}
