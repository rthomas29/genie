import React, { Component } from 'react';
import firebase from './config/firebase';
import { database } from './config/firebase';
import { auth } from './config/firebase';
import { Button, SocialIcon, Text } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Landing from './components/Landing';
import WishList from './components/WishList';
import NameForm from './components/NameForm';
import ImageUpload from './components/ImageUpload';
import Login from './components/Login';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text h2>genie</Text>
        <Button
          raised
          title="Login"
          onPress={() => this.props.navigation.navigate('Login', { navigation: this.props.navigation })}
        />
        {/* <Button
          raised
          title="Sign Up"
          onPress={() => this.props.navigation.navigate('Login', { navigation: this.props.navigation })}
        /> */}
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  social: {
    padding: 10,
  },
});

export const MainStack = StackNavigator({
  Landing: {
    screen: Home,
  },
  Login: {
    screen: Login,
  },
  WishList: {
    screen: WishList,
  },
  ImageUpload: {
    screen: ImageUpload,
  },
  NameForm: {
    screen: NameForm,
  },
});

const RootStack = StackNavigator(
  {
    Main: {
      screen: MainStack,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
