import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

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
  static navigationOptions = {
    title: 'Wish List',
  };
  render() {
    if (this.state.wishLength === 0) {
      return (
        <View style={styles.container}>
          <Text h4>You don't have any wishes.</Text>
          <Button
            onPress={this.toggleModal}
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
          <Modal visible={this.state.modalVisible} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                <TextInput
                  style={{ height: 20, borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={text => this.setState({ giftName: text })}
                  editable={true}
                  height={60}
                  value={this.state.giftName}
                  autoFocus={true}
                  placeholder="Enter gift name"
                />
                <Button onPress={this.toggleModal} title="Close modal" />
              </View>
            </View>
          </Modal>
        </View>
      );
    }
    return <Text>WishList</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  innerContainer: {},
});
