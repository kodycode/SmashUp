import React from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import styles from './styles'

class ChatWindow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      friendName: 'poop',
      messages: []
    }
  }

  componentWillMount () {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any'
          }
        },
        {
          _id: 2,
          text: 'How are you?',
          createdAt: new Date(),
          user: {
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any'
          }
        }
      ]
    })
  }

  onSend (messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }))
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
              <Text style={styles.nameTextStyle}>{this.state.friendName}</Text>
            </View>
          </View>
        </View>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}/>
        { Platform.OS === 'android' ? <KeyboardSpacer /> : null }
      </View>
    )
  }
}

module.exports = ChatWindow
