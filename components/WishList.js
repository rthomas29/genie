import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

export default class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      giftLength: 0,
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
    title: 'Your WishLists',
  };
  render() {
    if (this.state.giftLength === 0) {
      return (
        <View>
          <Text>You haven't added any gifts to your list!</Text>
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
          <TouchableOpacity onPress={this.toggleModal}>
            <Text>Add gift</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return <Text>WishList</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  innerContainer: {},
});
