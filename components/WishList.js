import React, { Component } from "react";
import { StyleSheet, View, TextInput, Image, TouchableOpacity } from "react-native";
import { Text, Button, FormLabel, FormInput, SocialIcon, Header, List, ListItem, Icon } from "react-native-elements";
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
  deleteItem = () => {
    alert("workin");
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
    const rightButtons = [
      <TouchableOpacity style={styles.icon} onPress={() => deleteFunc()}>
        <Icon name="edit" />
      </TouchableOpacity>,
      <TouchableOpacity style={styles.icon} onPress={() => deleteFunc()}>
        <Icon name="delete" />
      </TouchableOpacity>,
    ];
    return (
      <View style={styles.container}>
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
                <Swipeable
                  key={key}
                  style={styles.listItem}
                  rightButtons={rightButtons}
                  rightActionActivationDistance={100}
                  onRef={ref => (this.swipeable = ref)}
                >
                  <ListItem roundAvatar title={wish.name} avatar={wish.imgUrl} hideChevron={true} />
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
