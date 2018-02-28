import React, { Component } from "react";
import { Text, View, Alert, Image } from "react-native";
import { Button } from "react-native-elements";
import { ImagePicker } from "expo";
import { styles } from "../App";
import firebase from "../config/firebase";
import { database } from "../config/firebase";

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      showSave: false,
    };
    this.pickImage = this.pickImage.bind(this);
  }
  addWishToDb = wishName => {
    const wish = {
      name: wishName,
      imgUrl: this.state.image,
    };

    this.wishRef.push(wish);

    this.props.navigation.navigate("WishList", { user: this.user });
  };
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri, showSave: !this.state.showSave });
    }
  };
  addNewWish = () => {
    this.wishRef.on("child_added", snapshot => {
      console.log(snapshot.val());
      // this.setState({ data: snapshot.val() });
    });
  };
  componentDidMount() {
    this.user = firebase.auth().currentUser;
    this.wishRef = firebase.database().ref(`wishes/${this.user.uid}`);
  }
  componentWillUnmount() {
    this.addNewWish();
  }
  render() {
    const { params } = this.props.navigation.state;
    this.giftName = params ? params.giftName : null;
    let { image } = this.state;

    if (this.state.showSave === false) {
      return (
        <View style={styles.container}>
          <Button
            onPress={() => this.pickImage()}
            title="Upload Wish Image"
            buttonStyle={{
              backgroundColor: "#fff",
              borderColor: "#19B5FE",
              borderRadius: 5,
            }}
            textStyle={{
              color: "#000",
            }}
          />
        </View>
      );
    } else if (this.state.showSave) {
      return (
        <View style={styles.container}>
          <Button
            onPress={() => this.addWishToDb(this.giftName)}
            title="Save Wish"
            buttonStyle={{
              backgroundColor: "#fff",
              borderColor: "#19B5FE",
              borderRadius: 5,
            }}
            textStyle={{
              color: "#000",
            }}
          />
        </View>
      );
    }
  }
}
