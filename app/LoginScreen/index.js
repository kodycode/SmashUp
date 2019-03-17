import React from 'react'
import { Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import styles from './styles'

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginFormVisible: false,
      registerFormVisible: false
    }
  }

  _setLoginFormVisible = (arg) => {
    this.setState({ loginFormVisible: arg })
  }

  _setRegisterFormVisible = (arg) => {
    this.setState({ registerFormVisible: arg })
  }

  _onLoginPress = () => {
    this.setState({ loginFormVisible: true })
  }

  _onRegisterPress = () => {
    this.setState({ registerFormVisible: true })
  }

  render () {
    return (
      <View style={styles.ViewContainer}>
        {
          this.state.loginFormVisible === true ?
          <LoginForm loginFormVisible={this.state.loginFormVisible} _setLoginFormVisible={this._setLoginFormVisible}/> :
          null
        }
        {
          this.state.registerFormVisible === true ?
          <RegisterForm registerFormVisible={this.state.registerFormVisible} _setRegisterFormVisible={this._setRegisterFormVisible}/> :
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
          <ImageBackground
            source={require('../../assets/img/button_background.png')}
            style={ styles.LoginImageBackgroundStyle }
          >
            <Text style={styles.LoginText}>Login</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onRegisterPress} style={styles.LoginButton}>
          <ImageBackground
            source={require('../../assets/img/button_background.png')}
            style={ styles.LoginImageBackgroundStyle }
          >
            <Text style={styles.LoginText}>Register</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    )
  }
}

module.exports = LoginScreen
