import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, List, ListItem } from 'react-native-elements';
import { styles } from './WishList';

export default class SentLists extends Component {
  static navigationOptions({ navigation }) {
    return {
      headerLeft: <Text>Back</Text>,
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
