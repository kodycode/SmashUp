import React from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'

class HomeScreen extends React.Component {
  render () {
    return (
      <View>
        <View style={styles.DirectionContainer}>
          <TouchableOpacity>
            <Text style={styles.TextStyle}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.TextStyle}>Friends</Text>
          </TouchableOpacity>
        </View>
        <View style={ styles.profileContainer }>
        </View>
        <View style={styles.buttonContainer}>
        </View>
      </View>
    )
  }
}

module.exports = HomeScreen
