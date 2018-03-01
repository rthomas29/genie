import React, { Component } from "react";
import { View } from "react-native";
import { Text, Button, FormLabel, FormInput } from "react-native-elements";
import firebase from "../config/firebase";
import { database } from "../config/firebase";

export default class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      giftName: "",
    };
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput = text => {
    this.setState({ giftName: text });
  };
  goToImageUpload = nav => {
    this.props.navigation.navigate("ImageUpload", { getImageUrl: this.getImageUrl, giftName: this.state.giftName });
    this.setState({ wishLength: this.state.wishLength + 1 });
  };
  sendGiftNameToWishList = (setImageValFunc, currentInputVal, nav) => {
    setImageValFunc(currentInputVal);
    this.goToImageUpload(nav);
  };
  render() {
    const { params } = this.props.navigation.state;
    const giftName = params ? params.giftName : null;
    const navigation = params ? params.navigation : null;
    const getImageUrl = params ? params.getImageUrl : null;

    return (
      <View>
        <FormLabel>Wish Name</FormLabel>
        <FormInput
          style={{ height: 10, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => this.handleInput(text)}
          editable={true}
          height={60}
          value={this.state.giftName}
          autoFocus={true}
        />
        <Button
          rounded
          buttonStyle={{
            borderColor: "#19B5FE",
            backgroundColor: "#3498DB",
            marginBottom: 10,
          }}
          onPress={() => this.props.navigation.navigate("ImageUpload", { giftName: this.state.giftName })}
          title="Next"
          textStyle={{
            color: "#000",
          }}
        />
      </View>
    );
  }
}
