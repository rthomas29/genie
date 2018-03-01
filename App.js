import React, { Component } from "react";
import firebase from "./config/firebase";
import { database } from "./config/firebase";
import { auth } from "./config/firebase";
import { Button, SocialIcon, Text } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { StackNavigator } from "react-navigation";
import WishList from "./components/WishList";
import NameForm from "./components/NameForm";
import ImageUpload from "./components/ImageUpload";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import WishDetail from "./components/WishDetail";

class Landing extends Component {
  static navigationOptions = {
    title: "Landing",
  };
  render() {
    return (
      <View style={styles.container}>
        <Text h2>genie</Text>
        <Button raised title="Login" onPress={() => this.props.navigation.navigate("Login")} />
        <Button raised title="Sign Up" onPress={() => this.props.navigation.navigate("SignUp")} />
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  social: {
    padding: 10,
  },
});

export const MainStack = StackNavigator({
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
});

const RootStack = StackNavigator(
  {
    Main: {
      screen: MainStack,
    },
  },
  {
    mode: "modal",
    headerMode: "none",
  },
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
