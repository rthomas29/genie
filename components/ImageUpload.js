import React, { Component } from 'react';
import { Text, View, Alert, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { ImagePicker } from 'expo';
import { styles } from '../App';
import firebase from '../config/firebase';
import { database } from '../config/firebase';

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
    this.pickImage = this.pickImage.bind(this);
  }
  addWishToDb = wishName => {
    this.user = firebase.auth().currentUser;
    const wish = {
      name: wishName,
      imgUrl: this.state.image,
    };

    firebase
      .database()
      .ref(`${this.user.uid}/wishes`)
      .push(JSON.stringify(wish));

    this.props.navigation.navigate('WishList', { user: this.user });
  };
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  componentWillUnmount() {
    // maybe put db calls here
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
          buttonStyle={{
            backgroundColor: '#fff',
            borderColor: '#19B5FE',
            borderRadius: 5,
          }}
          textStyle={{
            color: '#000',
          }}
        />
        <Button
          onPress={() => this.addWishToDb(this.giftName)}
          title="Save Wish"
          buttonStyle={{
            backgroundColor: '#fff',
            borderColor: '#19B5FE',
            borderRadius: 5,
          }}
          textStyle={{
            color: '#000',
          }}
        />
      </View>
    );
  }
}
