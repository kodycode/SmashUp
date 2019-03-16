import React, { Component } from 'react'
import { Modal, Text, TextInput, TouchableHighlight, View, Alert } from 'react-native'
import styles from './styles'

class ModalExample extends Component {
  render () {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
          }}>
          <View style={ styles.LoginFormContainer }>
            <Text>Username:</Text>
            <TextInput
              placeholder='Enter username here'
              style={styles.textBoxStyle}
            />
            <Text style={styles.textMargin}>Password:</Text>
            <TextInput
              placeholder='Enter password here'
              style={styles.textBoxStyle}
            />
            <TouchableHighlight
              onPress={() => {

              }}
              style={styles.loginButtonMargin}>
              <Text>Login</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                this.props._setModalVisible(!this.props.modalVisible)
              }}
              style={styles.closeButtonMargin}>
              <Text>Close</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    )
  }
}

module.exports = ModalExample
