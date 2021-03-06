import React, { Component } from 'react'
import { Alert, Modal, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import AutoTags from 'react-native-tag-autocomplete'
import InputScrollView from 'react-native-input-scroll-view'
import firebase from 'firebase'
import styles from './styles'

class EditForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      playerName: '',
      averageGSP: '',
      location: '',
      bio: '',
      tagsSelected: [],
      characterRoster: [
        { name: 'All Characters' },
        { name: 'Mario' },
        { name: 'Donkey Kong' },
        { name: 'Link' },
        { name: 'Samus' },
        { name: 'Dark Samus' },
        { name: 'Yoshi' },
        { name: 'Kirby' },
        { name: 'Fox' },
        { name: 'Pikachu' },
        { name: 'Luigi' },
        { name: 'Ness' },
        { name: 'Captain Falcon' },
        { name: 'Jigglypuff' },
        { name: 'Daisy' },
        { name: 'Bowser' },
        { name: 'Ice Climbers' },
        { name: 'Sheik' },
        { name: 'Zelda' },
        { name: 'Dr. Mario' },
        { name: 'Pichu' },
        { name: 'Falco' },
        { name: 'Marth' },
        { name: 'Lucina' },
        { name: 'Young Link' },
        { name: 'Ganondorf' },
        { name: 'Metwo' },
        { name: 'Roy' },
        { name: 'Chrom' },
        { name: 'Mr. Game & Watch' },
        { name: 'Meta Knight' },
        { name: 'Pit' },
        { name: 'Dark Pit' },
        { name: 'Zero Suit Samus' },
        { name: 'Wario' },
        { name: 'Ike' },
        { name: 'Pokemon Trainer' },
        { name: 'Diddy Kong' },
        { name: 'Lucas' },
        { name: 'Sonic' },
        { name: 'King Dedede' },
        { name: 'Olimar' },
        { name: 'Lucario' },
        { name: 'R.O.B' },
        { name: 'Toon Link' },
        { name: 'Wolf' },
        { name: 'Villager' },
        { name: 'Mega Man' },
        { name: 'Wii Fit Trainer' },
        { name: 'Rosalina & Luma' },
        { name: 'Little Mac' },
        { name: 'Greninja' },
        { name: 'Mii Fighter' },
        { name: 'Palutena' },
        { name: 'Pac-Man' },
        { name: 'Robin' },
        { name: 'Shulk' },
        { name: 'Bowser Jr.' },
        { name: 'Duck Hunt' },
        { name: 'Ryu' },
        { name: 'Ken' },
        { name: 'Cloud' },
        { name: 'Corrin' },
        { name: 'Bayonetta' },
        { name: 'Inkling' },
        { name: 'Ridley' },
        { name: 'Simon' },
        { name: 'Richter' },
        { name: 'King K. Rool' },
        { name: 'Isabelle' },
        { name: 'Incineroar' },
        { name: 'Piranha Plant' },
        { name: 'Joker' }
      ]
    }
  }

  _onEdit = () => {
    var newUpdate = {}
    if (this.state.playerName.trim().replace(/\s/g, '').length && this.state.playerName.trim()) {
      newUpdate.playerName = this.state.playerName.trim()
    }
    if (this.state.averageGSP.trim().replace(/\s/g, '').length && this.state.averageGSP.trim()) {
      newUpdate.averageGSP = this.state.averageGSP.trim()
    }
    if (this.state.location.trim().replace(/\s/g, '').length && this.state.location.trim()) {
      newUpdate.location = this.state.location.trim()
    }
    if (this.state.bio.trim().replace(/\s/g, '').length && this.state.bio.trim()) {
      newUpdate.bio = this.state.bio.trim()
    }
    if (this.state.tagsSelected.length) {
      newUpdate.listOfCharacters = this.state.tagsSelected
    }
    firebase.firestore().collection('users').doc(this.props.userData.user.email.trim()).update(newUpdate)
    this.props.setEditFormVisible(false)
    Alert.alert('Success', 'Profile Updated')
    this.props.checkProfileData()
  }

  handleDelete = (index) => {
    let tagsSelected = this.state.tagsSelected
    tagsSelected.splice(index, 1)
    this.setState({ tagsSelected })
  }

  handleAddition = (suggestion) => {
    // Only select up to three characters
    if (this.state.tagsSelected.findIndex(x => x === suggestion) === -1) {
      if (suggestion.name === 'All Characters') {
        this.setState({ tagsSelected: [suggestion] })
      } else if (this.state.tagsSelected.length < 3) {
        this.setState({ tagsSelected: this.state.tagsSelected.concat([suggestion]) })
      }
    }
  }

  render () {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.editFormVisible}
          onRequestClose={() => {}}
        >
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.setEditFormVisible(false)
              }}
              style={styles.closeButtonMargin}>
              <Text style={{ fontSize: 40 }}>×</Text>
            </TouchableOpacity>
          </View>
          <InputScrollView
            style={styles.EditFormContainer}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            <Text style={{ fontFamily: 'gotham' }}>Player Name</Text>
            <TextInput
              placeholder='Enter player name here'
              style={styles.textBoxStyle}
              onChangeText={(playerName) => { this.setState({ playerName }) }}
            />
            <Text style={{ fontFamily: 'gotham' }}>Location</Text>
            <TextInput
              placeholder='Enter city and state here'
              style={styles.textBoxStyle}
              onChangeText={(location) => { this.setState({ location }) }}
            />
            <Text style={{ fontFamily: 'gotham' }}>Average GSP</Text>
            <TextInput
              placeholder='Enter GSP Here'
              style={styles.textBoxStyle}
              onChangeText={(averageGSP) => { this.setState({ averageGSP }) }}
            />
            <Text style={{ fontFamily: 'gotham' }}>Characters (up to 3)</Text>
            <View>
              <AutoTags
                suggestions={this.state.characterRoster}
                tagsSelected={this.state.tagsSelected}
                handleAddition={this.handleAddition}
                handleDelete={this.handleDelete}
                placeholder="Type in the character(s) you play"
              />
            </View>
            <Text style={{ fontFamily: 'gotham' }}>Bio</Text>
            <TextInput
              placeholder='Tell us about yourself'
              style={styles.textBoxStyle}
              maxLength={200}
              multiline={true}
              onChangeText={(bio) => { this.setState({ bio }) }}
            />
            <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                onPress={() => { this._onEdit() }}
                style={styles.doneButtonMargin}
              >
                <ImageBackground
                  source={require('../../../assets/img/button_background.png')}
                  style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Text style={{ color: 'white', fontFamily: 'gotham' }}>Done</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </InputScrollView>
        </Modal>
      </View>
    )
  }
}

module.exports = EditForm
