import React, { Component } from 'react'
import { Alert, Modal, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import firebase from 'firebase'
import styles from './styles'

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  _onLogin = () => {
    var instance = this
    firebase.auth().signInWithEmailAndPassword(this.state.username.trim(), this.state.password)
      .then(function (res) {
        instance.props.setLoginFormVisible(false, true, res)
      })
      .catch(function (error) {
        var errorMessage = error.message
        Alert.alert('Error', errorMessage)
      })
  }

  render () {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.loginFormVisible}
          onRequestClose={() => {}}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.setLoginFormVisible(!this.props.loginFormVisible)
              }}
              style={styles.closeButtonMargin}>
              <Text style={{ fontSize: 40 }}>×</Text>
            </TouchableOpacity>
          </View>
          <View style={ styles.LoginFormContainer }>
            <Text style={{ fontFamily: 'gotham' }}>Username:</Text>
            <TextInput
              placeholder='Enter username here'
              style={styles.textBoxStyle}
              onChangeText={(username) => { this.setState({ username }) }}
            />
            <Text style={styles.textMargin}>Password:</Text>
            <TextInput
              placeholder='Enter password here'
              secureTextEntry={true}
              style={styles.textBoxStyle}
              onChangeText={(password) => { this.setState({ password }) }}
            />
            <TouchableOpacity
              onPress={() => { this._onLogin() }}
              style={styles.loginButtonMargin}
            >
              <ImageBackground
                source={require('../../../assets/img/button_background.png')}
                style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={{ color: 'white', fontFamily: 'gotham' }}>Login</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )
  }
}

module.exports = LoginForm
