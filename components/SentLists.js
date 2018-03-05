import React, { Component } from 'react';
import { View } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import { styles } from './WishList';

export default class SentLists extends Component {
  static navigationOptions({ navigation }) {
    return {
      headerLeft: (
        <Icon name="backspace" color="#fff" onPress={() => navigation.navigate('WishList')} />
      ),
      headerTitle: 'Received Lists',
    };
  }
  constructor() {
    super();
  }
  render() {
    const wishLists = [
      { title: "Rakeem's WishList" },
      { title: "Alise's WishList" },
      { title: "Nori's WishList" },
    ];
    return (
      <View style={styles.container}>
        <List>{wishLists.map(item => <ListItem key={item.title} title={item.title} />)}</List>
      </View>
    );
  }
}
