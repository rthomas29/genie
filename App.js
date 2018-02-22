import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Landing from './components/Landing';
import WishList from './components/WishList';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    return (
      <View style={styles.container}>
        <Landing />
        <Button onPress={() => Alert.alert("We're working")} title="Sign Up" />
        <Button onPress={() => Alert.alert("We're working")} title="Log In" />
        <Button onPress={() => this.props.navigation.navigate('WishList')} title="See WishList" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MainStack = StackNavigator({
  Landing: {
    screen: Home,
  },
  WishList: {
    screen: WishList,
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
