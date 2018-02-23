import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';
import { Text, Button, FormLabel, FormInput } from 'react-native-elements';
import MainStack from '../App';
import Modal from 'react-native-modal';
import ImageUpload from './ImageUpload';
import NameForm from './NameForm';
import { withNavigation } from 'react-navigation';

export default class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishLength: 0,
      modalVisible: false,
      giftName: '',
      imgUrl: '',
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getImageUrl = this.getImageUrl.bind(this);
  }

  toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }
  showModal() {
    this.setState({ modalVisible: true });
  }
  closeModal() {
    this.setState({
      modalVisible: false,
      giftName: '',
      imgUrl: '',
    });
  }
  getImageUrl(url) {
    this.setState({ imgUrl: url });
  }
  static navigationOptions = {
    title: 'Wish List',
  };
  goToImageUpload = nav => {
    nav('ImageUpload', { getImageUrl: this.getImageUrl });
    this.setState({ modalVisible: false, wishLength: this.state.wishLength + 1 });
  };
  render() {
    const { params } = this.props.navigation.state;
    const navigation = params ? params.navigation : null;

    if (this.state.wishLength === 0) {
      return (
        <View style={styles.container}>
          <Text h4>You don't have any wishes.</Text>
          <Button
            onPress={() =>
              navigation('NameForm', { giftName: this.state.giftName, navigation, getImageUrl: this.getImageUrl })
            }
            buttonStyle={{
              borderColor: '#19B5FE',
              backgroundColor: '#fff',
              borderRadius: 5,
            }}
            textStyle={{
              color: '#000',
            }}
            title="Create new wish"
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text>Name: {this.state.giftName}</Text>
          <Image source={{ uri: this.state.imgUrl }} style={{ width: 40, height: 40 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#ECF0F1',
  },
});
