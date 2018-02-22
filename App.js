import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
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
        <Button
          onPress={() => this.props.navigation.navigate('WishList')}
          title="See Wishlist"
          buttonStyle={{
            backgroundColor: '#fff',
            borderColor: '#19B5FE',
            borderRadius: '5px',
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
