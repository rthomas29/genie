import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, FormLabel, FormInput, Tile } from "react-native-elements";
import firebase from "../config/firebase";
import { ImagePicker } from "expo";

export default class Edit extends Component {
  static navigationOptions = {
    headerTitle: "Edit",
  };
  constructor(props) {
    super(props);
    this.state = {
      wishName: "",
      wishUrl: null,
      key: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = text => {
    this.setState({ wishName: text });
  };
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({ wishUrl: result.uri });
    }
  };
  updateWish = async (newName, newUrl, key) => {
    console.log(key);
    const wish = {
      name: newName,
      imgUrl: newUrl,
    };
    try {
      await this.wishRef.child(key).update(wish);
      this.props.navigation.navigate("WishList", { user: this.user });
      console.log("updated");
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.user = params.user;
    this.wishRef = params.wishRef;
    this.setState({ wishName: params.wish.name, wishUrl: params.wish.imgUrl, key: params.key });
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
          width={200}
          height={200}
          title="Click photo to edit"
          onPress={() => this.pickImage()}
        />
        <Button
          onPress={() => this.updateWish(this.state.wishName, this.state.wishUrl, this.state.key)}
          buttonStyle={{
            borderColor: "#19B5FE",
            backgroundColor: "#fff",
            borderRadius: 5,
          }}
          textStyle={{
            color: "#000",
          }}
          title="Update wish"
        />
      </View>
    );
  }
}
