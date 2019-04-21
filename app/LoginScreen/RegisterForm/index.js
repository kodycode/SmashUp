import React, { Component } from 'react'
import { Alert, Modal, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import InputScrollView from 'react-native-input-scroll-view'
import firebase from 'firebase'
import '@firebase/firestore'
import styles from './styles'

class RegisterForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      realName: '',
      age: '',
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

      firebase.auth().createUserWithEmailAndPassword(instance.state.username.trim().toLowerCase(), instance.state.password)
        .then(function (res) {
          instance.state.dbh.collection('users').doc(instance.state.username.trim().toLowerCase()).set({
            realName: this.state.name.trim(),
            age: this.state.age.trim(),
            playerName: 'Enter Player Name',
            location: 'Undeclared',
            bio: 'About Me',
            listOfCharacters: [
              { name: 'All Characters' }
            ],
            requestsSent: []
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
          <InputScrollView
            style={ styles.RegisterFormContainer}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            <Text style={{ fontFamily: 'gotham' }}>First Name:</Text>
            <TextInput
              placeholder='Enter first name here'
              style={styles.textBoxStyle}
              onChangeText={(name) => { this.setState({ name }) }}
            />
            <Text style={styles.textMargin}>Age:</Text>
            <TextInput
              placeholder='Enter age here'
              secureTextEntry={true}
              style={styles.textBoxStyle}
              onChangeText={(age) => { this.setState({ age }) }}
            />
            <Text style={styles.textMargin}>Username:</Text>
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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
          </InputScrollView>
        </Modal>
      </View>
    )
  }
}

module.exports = RegisterForm
