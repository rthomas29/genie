import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

export default class GiftForm extends Component {
  constructor() {
    super();
    this.state = {
      giftName: '',
    };
  }
  render() {
    return (
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => this.setState({ giftName })}
        value={this.state.giftName}
      />
    );
  }
}
