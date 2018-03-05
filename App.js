import React, { Component } from 'react';
import { Button, Text } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import firebase from './config/firebase';
import WishList from './components/WishList';
import NameForm from './components/NameForm';
import ImageUpload from './components/ImageUpload';
import Login from './components/Login';
import SignUp from './components/SignUp';
import WishDetail from './components/WishDetail';
import Edit from './components/Edit';
import SentLists from './components/SentLists';

class Landing extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('WishList', { user, nav: this.props.navigation });
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text h2>genie</Text>
        <Button
          rounded
          buttonStyle={{
            borderColor: '#19B5FE',
            backgroundColor: '#3498DB',
            marginTop: 10,
            marginBottom: 10,
            width: 280,
          }}
          title="Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Button
          rounded
          buttonStyle={{
            borderColor: '#19B5FE',
            backgroundColor: '#3498DB',
            marginBottom: 10,
            width: 280,
          }}
          title="Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
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
});

export const Drawer = DrawerNavigator({
  Back: {
    screen: MainStack,
  },
  Received: {
    screen: SentLists,
  },
});
export const MainStack = StackNavigator(
  {
    initialRouteName: Landing,
    Landing: {
      screen: Landing,
    },
    Login: {
      screen: Login,
    },
    SignUp: {
      screen: SignUp,
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
    WishDetail: {
      screen: WishDetail,
    },
    Edit: {
      screen: Edit,
    },
    SentLists: {
      screen: SentLists,
    },
    Drawer: {
      screen: Drawer,
    },
  },
  {
    headerMode: 'float',
    navigationOptions: {
      headerBackTitle: 'Back',
      headerStyle: {
        backgroundColor: '#3498DB',
      },
    },
  },
);

export default class App extends Component {
  render() {
    return <MainStack />;
  }
}
