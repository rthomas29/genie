import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, FormLabel, FormInput, Tile } from "react-native-elements";

export default class Edit extends Component {
  constructor() {
    super();
    this.state = {
      wishName: "",
      wishUrl: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = text => {
    this.setState({ wishName: text });
  };
  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.setState({ wishName: params.wish.name, wishUrl: params.wish.imgUrl });
  }
  render() {
    return (
      <View>
        <Text h4>Edit</Text>
        <FormInput
          style={{ height: 10, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => this.handleChange(text)}
          editable={true}
          height={60}
          value={this.state.wishName}
          autoFocus={true}
        />
        <Tile
          imageSrc={{ uri: this.state.wishUrl }}
          featured={true}
          title="Click photo to edit"
          onPress={() => alert("clicked")}
        />
      </View>
    );
  }
}
