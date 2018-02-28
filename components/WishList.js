import React, { Component } from "react";
import { StyleSheet, View, TextInput, Image, TouchableOpacity } from "react-native";
import { Text, Button, FormLabel, FormInput, SocialIcon, Header, List, ListItem } from "react-native-elements";
import Swipeable from "react-native-swipeable";
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
      giftName: "",
      imgUrl: "",
      data: "",
    };
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

    const leftButton = [
      <TouchableOpacity>
        <Text>Edit</Text>
      </TouchableOpacity>,
    ];
    const rightButton = [
      <TouchableOpacity>
        <Text>Delete</Text>
      </TouchableOpacity>,
    ];

    const rightContent = <Text>Right</Text>;

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
            {map(data, (wish, key) => {
              return (
                <Swipeable key={key} leftButtons={leftButton} rightButtons={rightButton}>
                  <ListItem roundAvatar title={wish.name} avatar={wish.imgUrl} />
                </Swipeable>
              );
            })}
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
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
