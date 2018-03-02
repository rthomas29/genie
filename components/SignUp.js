import React, { Component } from "react";
import { View } from "react-native";
import { Button, Text, FormInput, FormLabel, SocialIcon } from "react-native-elements";
import firebase from "../config/firebase";
import { styles } from "../App";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      user: {},
      displayName: "",
    };
  }
  async signup(email, pass) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, pass);
      const user = firebase.auth().currentUser;
      this.setState({ user });
      console.log("Account created");
      this.setState({ email: "", password: "" });
      this.props.navigation.navigate("WishList", { user: this.state.user });
    } catch (error) {
      alert("Email or password is invalid");
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: 300 }}>
          <FormLabel>Email</FormLabel>
          <FormInput keyboardType="email-address" onChangeText={text => this.setState({ email: text })} />
          <FormLabel>Password</FormLabel>
          <FormInput secureTextEntry={true} onChangeText={text => this.setState({ password: text })} />
        </View>
        <Button
          rounded
          buttonStyle={{
            borderColor: "#19B5FE",
            backgroundColor: "#3498DB",
            marginTop: 10,
            marginBottom: 10,
            width: 250,
          }}
          onPress={() => this.signup(this.state.email, this.state.password)}
          title="Sign Up"
        />
      </View>
    );
  }
}
