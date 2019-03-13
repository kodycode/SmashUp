import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

class LoginScreen extends React.Component {
  render () {
    return (
      <View style = {styles.ViewContainer}>
        <Text style = {styles.LoginMessageStyle}>
          Discover new and challenging players nearby
        </Text>
      </View>
    )
  }
}

module.exports = LoginScreen
