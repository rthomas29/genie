import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button, FormLabel, FormInput } from 'react-native-elements';

export default class NameForm extends Component {
  render() {
    const { params } = this.props.navigation.state;
    const giftName = params ? params.giftName : null;
    const navigation = params ? params.navigation : null;

    return (
      <View>
        <FormLabel>Wish Name</FormLabel>
        <FormInput
          style={{ height: 10, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.setState({ giftName: text })}
          editable={true}
          height={60}
          value={giftName}
          autoFocus={true}
        />
        <Button
          onPress={() => navigation('ImageUpload')}
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
