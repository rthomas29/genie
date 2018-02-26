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
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.getImageUrl(this.state.image);
    }
    this.addWishToDb(giftName);
  };
  addWishToDb(wishName) {
    firebase
      .database()
      .ref('/wishes')
      .push(
        JSON.stringify({
          wishName: wishName,
          imgUrl: this.state.image,
        }),
      );
  }
  render() {
    const { params } = this.props.navigation.state;
    this.getImageUrl = params ? params.getImageUrl : null;
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
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }
}
