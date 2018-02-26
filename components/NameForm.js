import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button, FormLabel, FormInput } from 'react-native-elements';
import { database } from '../config/firebase';

export default class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput = text => {
    this.setState({ input: text });
  };
  goToImageUpload = nav => {
    this.props.navigation.navigate('ImageUpload', { getImageUrl: this.getImageUrl });
    this.setState({ wishLength: this.state.wishLength + 1 });
  };
  sendGiftNameToWishList = (setImageValFunc, currentInputVal, nav) => {
    setImageValFunc(currentInputVal);
    this.goToImageUpload(nav);
  };
  render() {
    const { params } = this.props.navigation.state;
    const giftName = params ? params.giftName : null;
    const navigation = params ? params.navigation : null;
    const getImageUrl = params ? params.getImageUrl : null;

    return (
      <View>
        <FormLabel>Wish Name</FormLabel>
        <FormInput
          style={{ height: 10, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.handleInput(text)}
          editable={true}
          height={60}
          value={this.state.input}
          autoFocus={true}
        />
        <Button
          onPress={() => this.sendGiftNameToWishList(getImageUrl, this.state.input, navigation)}
          title="Next"
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
