import React, { Component } from 'react';
import { StyleSheet, View, Image, Alert, Share } from 'react-native';
import { Text, Button, FormLabel, FormInput, List, ListItem, Icon } from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import ImageUpload from './ImageUpload';
import NameForm from './NameForm';
import firebase from '../config/firebase';
import map from 'lodash/map';

export default class WishList extends Component {
  static navigationOptions({ navigation }) {
    const { params } = navigation.state;
    const nav = params ? params.nav : null;
    return {
      headerLeft: (
        <Icon
          name="menu"
          color="#fff"
          onPress={() => {
            navigation.navigate('DrawerOpen');
          }}
        />
      ),
      headerTitle: 'WishList',
      headerRight: (
        <Icon
          name="exit-to-app"
          size={32}
          color="#fff"
          onPress={() => {
            firebase
              .auth()
              .signOut()
              .then(() => navigation.navigate('Landing'));
          }}
        />
      ),
    };
  }
  constructor() {
    super();
    this.state = {
      giftName: '',
      imgUrl: '',
      data: '',
    };
  }
  deleteItem = key => {
    this.wishRef.child(key).remove();
  };
  componentWillMount() {
    this.user = firebase.auth().currentUser;
  }
  componentDidMount() {
    this.wishRef = firebase.database().ref(`wishes/${this.user.uid}`);
    this.wishRef.on('value', snapshot => this.setState({ data: snapshot.val() }));
  }
  render() {
    const { params } = this.props.navigation.state;
    const user = params ? params.user : null;
    const { data } = this.state;
    const navigate = this.props.navigation.navigate;

    return (
      <View style={styles.container}>
        <Text
          h4
          style={{
            textAlign: 'center',
          }}
        >
          Welcome, {this.user.email}
        </Text>
        <List>
          {map(data, (wish, key) => {
            return (
              <Swipeable
                key={key}
                style={styles.listItem}
                leftContent={
                  <View style={styles.leftSwipeItem}>
                    <Text
                      style={{
                        flex: 1,
                      }}
                    >
                      Edit
                    </Text>
                  </View>
                }
                rightContent={<Text style={styles.rightSwipeItem}>Delete</Text>}
                leftActionActivationDistance={100}
                rightActionActivationDistance={100}
                onLeftActionRelease={() =>
                  Alert.alert(`Edit ${wish.name}`, 'Are you sure?', [
                    { text: 'Nope', style: 'cancel' },
                    {
                      text: "Yes, I'm sure",
                      onPress: () =>
                        navigate('Edit', {
                          wish: wish,
                          wishRef: this.wishRef,
                          user: this.user,
                          key: key,
                        }),
                    },
                  ])
                }
                onRightActionRelease={() =>
                  Alert.alert(`Delete ${wish.name}`, 'Are you sure?', [
                    { text: 'Nope', style: 'cancel' },
                    { text: "Yes, I'm sure", onPress: () => this.deleteItem(key) },
                  ])
                }
              >
                <ListItem
                  roundAvatar
                  title={wish.name}
                  avatar={wish.imgUrl}
                  hideChevron={true}
                  onPress={() =>
                    this.props.navigation.navigate('WishDetail', {
                      name: wish.name,
                      imgUrl: wish.imgUrl,
                    })
                  }
                />
              </Swipeable>
            );
          })}
        </List>
        <Button
          rounded
          onPress={() => this.props.navigation.navigate('NameForm')}
          buttonStyle={{
            backgroundColor: '#3498DB',
            marginBottom: 10,
            marginTop: 10,
          }}
          textStyle={{
            color: '#000',
          }}
          title="Create new wish"
        />
        <Button
          rounded
          onPress={() =>
            Share.share(
              {
                message: 'Join genie!',
                url: 'exp://8p-xqk.rthomas29.wishlist.exp.direct:80',
                subject: "Join Genie to view your friend's WishList",
              },
              {
                dialogTitle: 'Share WishList',
                excludedActivityTypes: [
                  'com.apple.UIKit.activity.PostToFacebook',
                  'com.apple.UIKit.activity.PostToTwitter',
                  'com.apple.UIKit.activity.PostToWeibo',
                  'com.apple.UIKit.activity.Print',
                  'com.apple.UIKit.activity.CopyToPasteboard',
                  'com.apple.UIKit.activity.AssignToContact',
                  'com.apple.UIKit.activity.SaveToCameraRoll',
                  'com.apple.UIKit.activity.AddToReadingList',
                  'com.apple.UIKit.activity.PostToFlickr',
                  'com.apple.UIKit.activity.PostToVimeo',
                  'com.apple.UIKit.activity.PostToTencentWeibo',
                  'com.apple.UIKit.activity.AirDrop',
                  'com.apple.UIKit.activity.OpenInIBooks',
                  'com.apple.UIKit.activity.MarkupAsPDF',
                  'com.apple.UIKit.activity.Slack',
                ],
              },
            )
          }
          buttonStyle={{
            borderColor: '#19B5FE',
            backgroundColor: '#3498DB',
          }}
          textStyle={{
            color: '#000',
          }}
          title="Share Wish List"
        />
      </View>
    );
  }
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  listItem: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
    backgroundColor: 'rgb(25, 181, 254)',
    alignSelf: 'stretch',
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 20,
    backgroundColor: 'rgb(242, 38, 19)',
  },
});
