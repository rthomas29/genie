import React, { Component } from "react";
import { View } from "react-native";
import { Button, FormLabel, FormInput } from "react-native-elements";

export default class NameForm extends Component {
  constructor() {
    super();
    this.state = {
      giftName: "",
    };
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput = text => {
    this.setState({ giftName: text });
  };
  render() {
    return (
      <View>
        <FormLabel>Wish Name</FormLabel>
        <FormInput
          style={{ height: 10 }}
          onChangeText={text => this.handleInput(text)}
          editable={true}
          height={60}
          value={this.state.giftName}
          autoFocus={true}
        />
        <Button
          rounded
          buttonStyle={{
            backgroundColor: "#3498DB",
            marginBottom: 10,
            marginTop: 10,
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
