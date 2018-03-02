import React, { Component } from "react";
import { View, Image } from "react-native";
import { Button } from "react-native-elements";
import { ImagePicker } from "expo";
import { styles } from "../App";
import { database } from "../config/firebase";
import firebase from "../config/firebase";

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
    this.pickImage = this.pickImage.bind(this);
  }
  addWishToDb = wishName => {
    this.props.navigation.navigate("WishList", { user: this.user });
    const wish = {
      name: wishName,
      imgUrl: this.state.image,
    };
    this.wishRef.push(wish);
  };
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.addWishToDb(this.giftName);
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
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.pickImage()}
          title="Upload Wish Image"
          rounded
          buttonStyle={{
            borderColor: "#19B5FE",
            backgroundColor: "#3498DB",
            marginBottom: 10,
          }}
          textStyle={{
            color: "#000",
          }}
        />
      </View>
    );
  }
}
