import React, { Component } from "react";
import { View } from "react-native";
import { Button, FormInput, FormLabel } from "react-native-elements";
import { styles } from "../App";
import firebase from "../config/firebase";

export default class Login extends Component {
  static navigationOptions = {
    headerLeft: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      user: {},
    };
  }
  async login(email, pass) {
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      await firebase.auth().signInWithEmailAndPassword(email, pass);
      const user = firebase.auth().currentUser;
      this.setState({ user });
      this.props.navigation.navigate("WishList", { user: this.state.user });
    } catch (error) {
      alert("Invalid user");
    }
  }
  componentDidMount() {}
  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Email</FormLabel>
        <FormInput keyboardType="email-address" onChangeText={text => this.setState({ email: text })} />
        <FormLabel>Password</FormLabel>
        <FormInput secureTextEntry={true} onChangeText={text => this.setState({ password: text })} />
        <Button
          rounded
          buttonStyle={{
            borderColor: "#19B5FE",
            backgroundColor: "#3498DB",
            marginBottom: 10,
          }}
          onPress={() => this.login(this.state.email, this.state.password)}
          title="Login"
        />
      </View>
    );
  }
}
