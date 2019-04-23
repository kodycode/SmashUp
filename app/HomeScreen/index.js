import React from 'react'
import { Alert, Platform, View, Text, TouchableOpacity, TouchableWithoutFeedback, BackHandler } from 'react-native'
import AutoTags from 'react-native-tag-autocomplete'
import firebase from 'firebase'
import styles from './styles'
import SwipeCards from 'react-native-swipe-cards'
import KeyboardSpacer from 'react-native-keyboard-spacer'

class Card extends React.Component {
  render () {
    return (
      <TouchableWithoutFeedback>
        <View style={[styles.card, { backgroundColor: 'black' }]}>
          <Text style={styles.textOverlay}>{this.props.realName}, {this.props.age}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

class HomeScreen extends React.Component {
  _didFocusSubscription
  _willBlurSubscription

  constructor (props) {
    super(props)
    this.state = {
      collectionData: {},
      tagsSelected: [],
      cards: [
        { realName: 'No matches yet', age: 'refresh?' }
      ],
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
        { name: 'Mii Brawler' },
        { name: 'Mii Swordfighter' },
        { name: 'Mii Gunner' },
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
    this.swipeCardRef = React.createRef()
    console.disableYellowBox = true
  }

  componentWillMount = () => {
    var instance = this
    this._didFocusSubscription = this.props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    )
    var tempCollectionData = {}
    firebase.firestore().collection('users').get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          if (this.state.tagsSelected.length) {
            this.state.tagsSelected.forEach(function (char) {
              if (char in doc.data().listOfCharacters) {
                tempCollectionData[doc.id] = doc.data()
              }
            })
          } else {
            if (doc.data().listOfCharacters) {
              tempCollectionData[doc.id] = doc.data()
            }
          }
        })
        if (Object.keys(tempCollectionData).length) {
          instance.setState({
            collectionData: tempCollectionData,
            cards: instance.getCards(tempCollectionData)
          })
        }
      })
  }

  componentWillUnmount = () => {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    )
  }

  onBackButtonPressAndroid = () => {
    return true
  }

  _onProfilePress = () => {
    const { navigate } = this.props.navigation
    const userData = this.props.navigation.getParam('userData', undefined)
    navigate('Profile', { userData: userData })
  }

  _onFriendPress = () => {
    const { navigate } = this.props.navigation
    const userData = this.props.navigation.getParam('userData', undefined)
    navigate('Friend', { userData: userData })
  }

  getCards = (collectionData) => {
    var tempCards = []
    const userData = this.props.navigation.getParam('userData', undefined)
    for (var profile in collectionData) {
      var obj = {}
      if (collectionData[profile].playerName !== undefined &&
          collectionData[profile].age !== undefined &&
          profile !== userData.user.email &&
          profile !== undefined) {
        obj = collectionData[profile]
        obj.email = profile
        tempCards.push(obj)
      }
    }
    return tempCards
  }

  displayProfile = (cardData) => {
    const { navigate } = this.props.navigation
    navigate('TempProfile', {
      userData: this.state.collectionData[cardData.current.state.card.email]
    })
  }

  _onYup = (cardData) => {
    if (Object.keys(this.state.collectionData).length) {
      var tempObj = {}
      const userData = this.props.navigation.getParam('userData', undefined)
      tempObj.requestsSent = this.state.collectionData[userData.user.email].requestsSent
      tempObj.requestsSent.push(cardData.current.state.card.email)
      firebase.firestore().collection('users').doc(userData.user.email.trim()).update(tempObj)
    }
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
        <View style={styles.DirectionContainer}>
          <TouchableOpacity style={styles.directionLeftButton} onPress={this._onProfilePress}>
            <Text style={styles.directionLeftTextStyle}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.directionRightButton} onPress={this._onFriendPress}>
            <Text style={styles.directionRightTextStyle}>Friends</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.filterContainer}>
            <AutoTags
              suggestions={this.state.characterRoster}
              tagsSelected={this.state.tagsSelected}
              handleAddition={this.handleAddition}
              handleDelete={this.handleDelete}
              placeholder="Filter"
            />
          </View>
          <SwipeCards
            cards={this.state.cards}
            renderCard={(cardData) => <Card {...cardData} />}
            ref={this.swipeCardRef}
            loop={true}
            handleYup={() => this._onYup(this.swipeCardRef)}
            onClickHandler={() => this.displayProfile(this.swipeCardRef)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => this.swipeCardRef.current._forceLeftSwipe()}>
            <Text style={styles.rejectButtonTextStyle}>×</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => this.swipeCardRef.current._forceRightSwipe()}>
            <Text style={styles.requestButtonTextStyle}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

module.exports = HomeScreen
