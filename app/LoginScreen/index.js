import React from 'react'
import { Alert, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import firebase from 'firebase'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import styles from './styles'

class LoginScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loginFormVisible: false,
      registerFormVisible: false
    }
  }

  _onLoginPress = () => {
    this.setState({ loginFormVisible: true })
  }

  _onRegisterPress = () => {
    this.setState({ registerFormVisible: true })
  }

  setLoginFormVisible = (dismissLoginForm, loginSuccess, userLoginData) => {
    const { navigate } = this.props.navigation
    this.setState({ loginFormVisible: dismissLoginForm })
    if (loginSuccess) {
      firebase.firestore().collection('users').doc(userLoginData.user.email.trim().toLowerCase()).get()
        .then(doc => {
          if (!doc.exists) {
            Alert.alert('Unexpected failure to obtain user data.')
          } else {
            navigate('Home', { userLoginData: userLoginData, userData: doc.data() })
          }
        })
        .catch(err => {
          Alert.alert('Error', err.message)
        })
    }
  }

  setRegisterFormVisible = (arg) => {
    this.setState({ registerFormVisible: arg })
  }

  render () {
    return (
      <View style={styles.ViewContainer}>
        {
          this.state.loginFormVisible === true
            ? <LoginForm
              loginFormVisible={this.state.loginFormVisible}
              setLoginFormVisible={this.setLoginFormVisible}
              onModalDismissed={this.onModalDismissed}/>
            : null
        }
        {
          this.state.registerFormVisible === true
            ? <RegisterForm
              registerFormVisible={this.state.registerFormVisible}
              setRegisterFormVisible={this.setRegisterFormVisible}/>
            : null
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
