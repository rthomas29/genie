import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default class ImageUpload extends Component {
  render() {
    return (
      <View>
        <Button
          onPress={this.getImage}
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
      </View>
    );
  }
}
