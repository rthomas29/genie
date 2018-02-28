import React, { Component } from "react";
import { StyleSheet, View, TextInput, Image } from "react-native";
import { Text, Button, FormLabel, FormInput, SocialIcon, Header, List, ListItem } from "react-native-elements";
import MainStack from "../App";
import Modal from "react-native-modal";
import ImageUpload from "./ImageUpload";
import NameForm from "./NameForm";
import { withNavigation } from "react-navigation";
import firebase from "../config/firebase";
import { auth } from "../config/firebase";
import { database } from "../config/firebase";
import map from "lodash/map";

export default class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishLength: 0,
      modalVisible: false,
      giftName: "",
      imgUrl: "",
      data: "",
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getImageUrl = this.getImageUrl.bind(this);
  }

  toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }
  showModal() {
    this.setState({ modalVisible: true });
  }
  closeModal() {
    this.setState({
      modalVisible: false,
      giftName: "",
      imgUrl: "",
    });
  }
  getImageUrl(url) {
    this.setState({ imgUrl: url });
  }
  goToImageUpload = nav => {
    nav("ImageUpload", { getImageUrl: this.getImageUrl });
    this.setState({ modalVisible: false, wishLength: this.state.wishLength + 1 });
  };
  async logout(nav) {
    try {
      await firebase.auth().signOut();
      console.log("Logged Out");
      nav.navigate("Landing");
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    this.user = firebase.auth().currentUser;
    this.wishRef = firebase.database().ref(`wishes/${this.user.uid}`);
    this.wishRef.on("value", snapshot => this.setState({ data: snapshot.val() }));
  }
  render() {
    const { params } = this.props.navigation.state;
    const user = params ? params.user : null;
    const { data } = this.state;

    if (this.state.wishLength === 0) {
      return (
        <View>
          <Text />
          <Header
            leftComponent={{ icon: "menu", color: "#fff" }}
            centerComponent={{ text: "Genie", style: { color: "#fff" } }}
            rightComponent={{ icon: "highlight-off", color: "#fff", onPress: () => this.logout(this.props.navigation) }}
          />
          <View>
            <Text>Welcome, {user.email}</Text>
            <List>
              {map(data, (wish, key) => <ListItem roundAvatar key={key} title={wish.name} avatar={wish.imgUrl} />)}
            </List>
            <Button
              onPress={() =>
                this.props.navigation.navigate("NameForm", {
                  giftName: this.state.giftName,
                  getImageUrl: this.getImageUrl,
                })
              }
              buttonStyle={{
                borderColor: "#19B5FE",
                backgroundColor: "#fff",
                borderRadius: 5,
              }}
              textStyle={{
                color: "#000",
              }}
              title="Create new wish"
            />
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <Text>Name: {this.state.giftName}</Text>
          <Image source={{ uri: this.state.imgUrl }} style={{ width: 40, height: 40 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
