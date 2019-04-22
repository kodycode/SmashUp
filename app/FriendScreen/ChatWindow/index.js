import React from 'react'
import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from 'firebase'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import styles from './styles'

class ChatWindow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      friendName: '',
      messages: [],
      previousState: [],
      messageHistory: [],
      firebaseSvc: {},
      userLoginData: props.navigation.getParam('userLoginData', undefined),
      friendData: props.navigation.getParam('friendData', undefined),
      roomName: ''
    }
    console.disableYellowBox = true
  }

  componentDidMount () {
    var roomName = ''
    var regex = /@.*/
    var userEmailName = this.state.userLoginData.user.email.replace(regex, '')
    var friendEmailName = this.state.friendData.email.replace(regex, '')
    var dbInstance = firebase.database()
    var instance = this
    var chatRef = {}
    if (userEmailName > friendEmailName) {
      roomName = userEmailName + '-' + friendEmailName
    } else {
      roomName = friendEmailName + '-' + userEmailName
    }
    dbInstance.ref(roomName).once('value', (snap) => {
      if (snap.val() === null) {
        console.log(roomName)
        var roomRef = dbInstance.ref().child(roomName)
        var newRoomRef = roomRef.push()
        newRoomRef.set({ roomName: 'to be set' })
      }
    })
    chatRef = dbInstance.ref(roomName)
    chatRef.on('value', (snapshot) => {
      var tempMessages = []
      var snapshotVal = snapshot.val()
      if (snapshotVal !== null) {
        for (var key in snapshotVal) {
          if (snapshotVal.hasOwnProperty(key)) {
            if (!snapshotVal[key].hasOwnProperty('roomName')) {
              snapshotVal[key].createdAt = new Date(snapshotVal[key].createdAt)
              tempMessages.push(snapshotVal[key])
            }
          }
        }
        instance.setState({ roomName: roomName, messages: tempMessages.reverse() })
      }
    })
  }

  onSend (msg) {
    console.log(this.state.roomName)
    var chatRef = firebase.database().ref(this.state.roomName)
    delete msg[0]._id
    msg[0].createdAt = new Date().getTime()
    chatRef.push(msg[0])
  }

  onPressBackbutton = () => {
    const { navigate } = this.props.navigation
    navigate('Friend')
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <View style={styles.contentContainer}>
            <TouchableOpacity onPress={() => this.onPressBackbutton()}>
              <Text style={styles.backButton}>←</Text>
            </TouchableOpacity>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTextStyle}>{this.state.friendData.playerName}</Text>
            </View>
          </View>
        </View>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderAvatar={() => { return null }}
          user={{
            _id: this.state.userLoginData.user.email
          }}/>
        { Platform.OS === 'android' ? <KeyboardSpacer /> : null }
      </View>
    )
  }
}

module.exports = ChatWindow
