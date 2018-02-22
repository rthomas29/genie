import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Landing from './components/Landing';
import WishList from './components/WishList';
import ImageUpload from './components/ImageUpload';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    return (
      <View style={styles.container}>
        <Landing />
        <Button
          onPress={() => this.props.navigation.navigate('WishList', { navigation: this.props.navigation.navigate })}
          title="See Wishes"
          buttonStyle={{
            backgroundColor: '#fff',
            borderColor: '#19B5FE',
            borderRadius: 5,
          }}
          textStyle={{
            color: '#000',
          }}
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
