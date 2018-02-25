import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text, FormInput, FormLabel, SocialIcon } from 'react-native-elements';
import config from '../config/firebase';
import * as firebase from 'firebase';
import { styles } from '../App';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  async signup(email, pass) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, pass);

      console.log('Account created');
      this.props.navigation.navigate('WishList');
      // Navigate to the Home page, the user is auto logged in
    } catch (error) {
      alert('Email or password is invalid');
      console.log(error.toString());
    }
  }
  componentDidMount() {
    firebase.initializeApp(config);
  }
  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Email</FormLabel>
        <FormInput onChangeText={text => this.setState({ email: text })} />
        <FormLabel>Password</FormLabel>
        <FormInput secureTextEntry={true} onChangeText={text => this.setState({ password: text })} />
        <Button onPress={() => this.signup(this.state.email, this.state.password)} title="Sign Up" />
      </View>
    );
  }
}
