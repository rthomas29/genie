import React, { Component } from "react";
import { View } from "react-native";
import { Tile } from "react-native-elements";

export default class WishDetail extends Component {
  static navigationOptions = {
    title: "Item Details",
  };
  render() {
    const { params } = this.props.navigation.state;
    const wishName = params ? params.name : null;
    const imgUrl = params ? params.imgUrl : null;

    return <Tile imageSrc={{ uri: imgUrl }} title={wishName} contentContainerStyle={{ height: 100 }} />;
  }
}
