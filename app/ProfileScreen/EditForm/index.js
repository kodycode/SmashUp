import React, { Component } from 'react'
import { Alert, Modal, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import firebase from 'firebase'
import styles from './styles'

class EditForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      age: '',
      playerName: '',
      listOfCharacters: [],
      Bio: ''
    }
  }

  _onEdit = () => {
    // TODO: Confirm with firebase that account exists
    // var instance = this
    // firebase.auth().signInWithEmailAndPassword(this.state.username.trim(), this.state.password)
    //   .then(function (res) {
    //     instance.props.setLoginFormVisible(false, true, res)
    //     console.log(res)
    //   })
    //   .catch(function (error) {
    //     // Handle Errors here.
    //     var errorMessage = error.message
    //     Alert.alert('Error', errorMessage)
    //   })
  }

  render () {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.editFormVisible}
          onRequestClose={() => {}}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.setEditFormVisible(false)
              }}
              style={styles.closeButtonMargin}>
              <Text style={{ fontSize: 40 }}>×</Text>
            </TouchableOpacity>
          </View>
          <View style={ styles.EditFormContainer }>
            <Text style={{ fontFamily: 'gotham' }}>Name</Text>
            <TextInput
              placeholder='Enter real name here'
              style={styles.textBoxStyle}
              onChangeText={(name) => { this.setState({ name }) }}
            />
            <Text style={{ fontFamily: 'gotham' }}>Age</Text>
            <TextInput
              placeholder='Enter age here'
              secureTextEntry={true}
              style={styles.textBoxStyle}
              onChangeText={(age) => { this.setState({ age }) }}
            />
            <Text style={{ fontFamily: 'gotham' }}>Player Name</Text>
            <TextInput
              placeholder='Enter player name here'
              style={styles.textBoxStyle}
              onChangeText={(playerName) => { this.setState({ playerName }) }}
            />
            <Text style={{ fontFamily: 'gotham' }}>Bio</Text>
            <TextInput
              placeholder='Tell us about yourself'
              secureTextEntry={true}
              style={styles.textBoxStyle}
              onChangeText={(bio) => { this.setState({ bio }) }}
            />
            <TouchableOpacity
              onPress={() => { this._onEdit() }}
              style={styles.editButtonMargin}
            >
              <ImageBackground
                source={require('../../../assets/img/button_background.png')}
                style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={{ color: 'white', fontFamily: 'gotham' }}>Done</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )
  }
}

module.exports = EditForm
