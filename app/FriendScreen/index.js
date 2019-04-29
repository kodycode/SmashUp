import React from 'react'
import ActionSheet from 'react-native-actionsheet'
import { Alert, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
import styles from './styles'

const options = ['Chat', 'View Profile', 'Remove', 'Cancel']

class FriendScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userData: {},
      friendList: [],
      currentFriend: {}
    }
    this.viewList = React.createRef()
  }

  componentWillMount = () => {
    var instance = this
    var tempFriendList = []
    var userCollectionData = {}
    const userLoginData = instance.props.navigation.getParam('userLoginData', undefined)
    firebase.firestore().collection('users').doc(userLoginData.user.email.trim().toLowerCase()).get()
      .then(doc => {
        if (!doc.exists) {
          Alert.alert('Unexpected failure to obtain user data.')
        } else {
          userCollectionData = doc.data()
        }
      })
      .catch(err => {
        Alert.alert('Error', err.message)
      })
    firebase.firestore().collection('users').get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          if (userCollectionData.requestsSent.includes(doc.id) &&
              doc.data().requestsSent.includes(userLoginData.user.email) &&
              doc.id !== userLoginData.user.email) {
            var friendData = doc.data()
            friendData.email = doc.id
            tempFriendList.push(friendData)
          }
        })
        instance.setState({
          userData: userCollectionData,
          friendList: tempFriendList
        })
      })
  }

  _onHomePress = () => {
    const { navigate } = this.props.navigation
    const userLoginData = this.props.navigation.getParam('userLoginData', undefined)
    navigate('Home', { userLoginData: userLoginData, userData: this.state.userData })
  }

  _actionSheetOnPress = (index) => {
    const { navigate } = this.props.navigation
    const userLoginData = this.props.navigation.getParam('userLoginData', undefined)
    switch (index) {
    case 0:
      navigate('Chat', { friendData: this.state.currentFriend, userLoginData: userLoginData })
      break
    case 1:
      navigate('TempProfile', { userLoginData: this.state.currentFriend })
      break
    case 2:
      var tmpObj = this.state.userData
      delete tmpObj.requestsSent.splice(tmpObj.requestsSent.indexOf(this.state.currentFriend.email), 1)
      firebase.firestore().collection('users').doc(userLoginData.user.email.trim().toLowerCase()).update(tmpObj)
      this.setState({ userData: tmpObj, friendList: tmpObj.requestsSent })
      this.forceUpdate()
      break
    default:
      break
    }
  }

  _getFriendList = (friendList) => {
    return (<FlatList data={friendList}
      renderItem={({ item }) => {
        return (<TouchableOpacity style={styles.friendBlock} onPress={() => this.showActionSheet(item)}>
          <View style={styles.avatarImg}>
          </View>
          <View style={{ paddingLeft: 5 }}>
            <Text style={styles.TextStyle}>Name: {item.realName}</Text>
            <Text style={styles.TextStyle}>Player Name: {item.playerName}</Text>
            <Text style={styles.TextStyle}>Characters: {
              item.listOfCharacters
                ? item.listOfCharacters.map((character, i) => {
                  return i + 1 !== item.listOfCharacters.length ? character.name + ', ' : character.name
                }) : null}</Text>
          </View>
        </TouchableOpacity>)
      }}
      keyExtractor={(item, index) => index.toString()}
    />)
  }

  showActionSheet = (item) => {
    this.ActionSheet.show()
    this.setState({ currentFriend: item })
  }

  render () {
    return (
      <View>
        <View style={styles.FriendContainer}>
          <View style={styles.DirectionContainer}>
            <TouchableOpacity style={styles.directionLeftButton} onPress={this._onHomePress}>
              <Text style={styles.directionLeftTextStyle}>Home</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.ScrollContainer}
            showsVerticalScrollIndicator={true}
          >
            {this._getFriendList(this.state.friendList)}
          </ScrollView>
          <ActionSheet
            ref={o => (this.ActionSheet = o)}
            title={this.state.currentFriend.playerName}
            options={options}
            cancelButtonIndex={3}
            destructiveButtonIndex={2}
            onPress={(index) => this._actionSheetOnPress(index)}
          />
        </View>
      </View>
    )
  }
}

module.exports = FriendScreen
