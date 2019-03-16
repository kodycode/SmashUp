import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import LoginForm from './LoginForm'
import styles from './styles'

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false
    }
  }

  _setModalVisible = (arg) => {
    this.setState({ modalVisible: arg })
  }

  _onLoginPress = () => {
    this.setState({ modalVisible: true })
  }

  render () {
    return (
      <View style={styles.ViewContainer}>
        {
          this.state.modalVisible === true ?
          <LoginForm modalVisible={this.state.modalVisible} _setModalVisible={this._setModalVisible}/> :
          null
        }
        <View style={{ width: '100%' }}>
          <Text style={styles.LoginMessageStyle}>
            Discover new and challenging players nearby
          </Text>
        </View>
        <View style={ styles.SmashballContainer }>
          <Image
            style={{ width: '90%', height: '90%' }}
            resizeMode="contain"
            source={require('../../assets/img/smashball_transparent.png')}
          />
        </View>
        <TouchableOpacity onPress={this._onLoginPress} style={styles.LoginButton}>
          <Text style={styles.LoginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.LoginButton}>
          <Text style={styles.LoginText}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

module.exports = LoginScreen
