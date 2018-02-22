import React, { Component } from 'react';
import { Text, View, Alert, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { ImagePicker } from 'expo';

export default class ImageUpload extends Component {
  constructor() {
    super();
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
    }
  };
  render() {
    let { image } = this.state;
    return (
      <View>
        <Button
          onPress={this.pickImage}
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
