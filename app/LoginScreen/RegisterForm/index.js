import React, { Component } from 'react'
import { Modal, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import styles from './styles'

class RegisterForm extends Component {

  registerAccount = () => {

  }

  render () {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.registerFormVisible}
          onRequestClose={() => {
            this.props._setRegisterFormVisible(!this.props.registerFormVisible)
          }}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props._setRegisterFormVisible(!this.props.registerFormVisible)
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
            />
            <Text style={styles.textMargin}>Password:</Text>
            <TextInput
              placeholder='Enter password here'
              style={styles.textBoxStyle}
            />
            <Text style={styles.textMargin}>Confirm Password:</Text>
            <TextInput
              placeholder='Re-enter password'
              style={styles.textBoxStyle}
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
