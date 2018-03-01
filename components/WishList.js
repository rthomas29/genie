import React, { Component } from "react";
import { StyleSheet, View, TextInput, Image, TouchableOpacity, Alert, Share } from "react-native";
import { Text, Button, FormLabel, FormInput, SocialIcon, Header, List, ListItem, Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { auth } from "../config/firebase";
import { database } from "../config/firebase";
import Swipeable from "react-native-swipeable";
import ImageUpload from "./ImageUpload";
import NameForm from "./NameForm";
import firebase from "../config/firebase";
import map from "lodash/map";

export default class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishLength: 0,
      giftName: "",
      imgUrl: "",
      data: "",
      wishToDelete: "",
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
  deleteItem = key => {
    this.wishRef.child(key).remove();
  };
  componentDidMount() {
    this.user = firebase.auth().currentUser;
    this.wishRef = firebase.database().ref(`wishes/${this.user.uid}`);
    this.wishRef.on("value", snapshot => this.setState({ data: snapshot.val() }));
    this.swipeable = null;
  }
  render() {
    const { params } = this.props.navigation.state;
    const user = params ? params.user : null;
    const { data } = this.state;
    const deleteFunc = this.deleteItem;
    const navigate = this.props.navigation.navigate;

    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "Genie", style: { color: "#fff" } }}
          rightComponent={{ icon: "account-circle", color: "#fff", onPress: () => this.logout(this.props.navigation) }}
        />
        <View>
          <Text>Welcome, {user.email}</Text>
          <List>
            {map(data, (wish, key) => {
              return (
                <Swipeable
                  key={key}
                  style={styles.listItem}
                  leftContent={<Text>Edit</Text>}
                  rightContent={<Text>Delete</Text>}
                  leftActionActivationDistance={50}
                  rightActionActivationDistance={50}
                  onRef={ref => (this.swipeable = ref)}
                  onLeftActionRelease={() =>
                    Alert.alert(`Edit ${wish.name}`, "Are you sure?", [
                      { text: "Nevermind", onPress: () => console.log("no"), style: "cancel" },
                      { text: "Yes, I'm sure", onPress: () => navigate("Edit", { wish: wish }) },
                    ])
                  }
                  onRightActionRelease={() =>
                    Alert.alert(`Delete ${wish.name}`, "Are you sure?", [
                      { text: "Nevermind", onPress: () => console.log("no"), style: "cancel" },
                      { text: "Yes, I'm sure", onPress: () => deleteFunc(key) },
                    ])
                  }
                >
                  <ListItem
                    roundAvatar
                    title={wish.name}
                    avatar={wish.imgUrl}
                    hideChevron={true}
                    onPress={() =>
                      this.props.navigation.navigate("WishDetail", { name: wish.name, imgUrl: wish.imgUrl })
                    }
                  />
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
          <Button
            onPress={() =>
              Share.share({
                message: "Testing the share",
                url: undefined,
                title: "Shared Thing",
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
            title="Share Wish List"
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  listItem: {
    height: 75,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
});
