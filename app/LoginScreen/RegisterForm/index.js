import React, { Component } from 'react'
import { Alert, Modal, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import firebase from 'firebase'
import '@firebase/firestore'
import styles from './styles'

class RegisterForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      confirmPass: '',
      dbh: firebase.firestore()
    }
    console.disableYellowBox = true
  }

  registerAccount = () => {
    if (this.state.password === this.state.confirmPass) {
      var instance = this
      firebase.auth().createUserWithEmailAndPassword(this.state.username.trim(), this.state.password)
        .then(function (res) {
          instance.state.dbh.collection('users').doc(this.state.username.trim()).set({
            name: 'Enter Name',
            age: 'Enter Age',
            playerName: 'Enter Player Name',
            aboutMe: 'About Me',
            listOfCharacters: [
              'Undecided'
            ]
          })
          instance.props.setRegisterFormVisible(false)
          Alert.alert('Success', 'Registration successful')
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorMessage = error.message
          Alert.alert('Error', errorMessage)
        })
    } else {
      Alert.alert('Error', 'Passwords do not match. Please make sure both passwords are the same.')
    }
  }

  render () {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.registerFormVisible}
          onRequestClose={() => {
            this.props.setRegisterFormVisible(!this.props.registerFormVisible)
          }}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.setRegisterFormVisible(!this.props.registerFormVisible)
              }}
              style={styles.closeButtonMargin}>
              <Text style={{ fontSize: 40 }}>×</Text>
            </TouchableOpacity>
          </View>
          <View style={ styles.RegisterFormContainer }>
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
            <Text style={styles.textMargin}>Confirm Password:</Text>
            <TextInput
              placeholder='Re-enter password'
              secureTextEntry={true}
              style={styles.textBoxStyle}
              onChangeText={(confirmPass) => { this.setState({ confirmPass }) }}
            />
            <TouchableOpacity
              onPress={() => { this.registerAccount() }}
              style={styles.registerButtonMargin}
            >
              <ImageBackground
                source={require('../../../assets/img/button_background.png')}
                style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={{ color: 'white', fontFamily: 'gotham' }}>Register</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )
  }
}

module.exports = RegisterForm
