import React, { Component } from 'react';
import { Button, SocialIcon } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Landing from './components/Landing';
import WishList from './components/WishList';
import NameForm from './components/NameForm';
import ImageUpload from './components/ImageUpload';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    return (
      <View style={styles.container}>
        <Landing />
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

const styles = StyleSheet.create({
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
