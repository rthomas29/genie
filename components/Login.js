import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text, FormInput, FormLabel, SocialIcon } from 'react-native-elements';
import firebase from '../config/firebase';
import { auth } from '../config/firebase';
import { styles } from '../App';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      user: {},
    };
  }
  // async signup(email, pass) {
  //   try {
  //     await firebase.auth().createUserWithEmailAndPassword(email, pass);
  //     console.log('Account created');
  //     this.setState({ email: '', password: '' });
  //     this.props.navigation.navigate('WishList');
  //   } catch (error) {
  //     alert('Email or password is invalid');
  //   }
  // }
  async login(email, pass) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, pass);
      const user = firebase.auth().currentUser;
      this.setState({ user });
      console.log(user);
      this.props.navigation.navigate('WishList', { user: this.state.user, navigation: this.props.navigation });
    } catch (error) {
      alert('Invalid user');
      console.log(error.toString());
    }
  }
  componentDidMount() {
    // this.authSubscription = firebase.auth().onAuthStateChanged(user => {
    //   this.setState({ user });
    // });
  }
  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Email</FormLabel>
        <FormInput keyboardType="email-address" onChangeText={text => this.setState({ email: text })} />
        <FormLabel>Password</FormLabel>
        <FormInput secureTextEntry={true} onChangeText={text => this.setState({ password: text })} />
        <Button onPress={() => this.login(this.state.email, this.state.password)} title="Login" />
      </View>
    );
  }
}
