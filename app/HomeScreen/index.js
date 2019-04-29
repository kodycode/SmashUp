import React from 'react'
import { Alert, Dimensions, View, Text, TouchableOpacity, TouchableWithoutFeedback, BackHandler } from 'react-native'
import AutoTags from 'react-native-tag-autocomplete'
import firebase from 'firebase'
import styles from './styles'
import SwipeCards from 'react-native-swipe-cards'
import ImageOverlay from 'react-native-image-overlay'
import Images from './Images'

class Card extends React.Component {
  render () {
    return (
      <TouchableWithoutFeedback>
        <View style={[styles.card, { backgroundColor: 'white' }]}>
          <ImageOverlay
            title={this.props.playerName + ', ' + this.props.age}
            source={Images[this.props.img]}
            overlayAlpha={0.3}
            contentPosition={'bottom'}/>
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
        { playerName: 'No matches yet', age: 'refresh?', img: '../../assets/img/roster.jpg' }
      ],
      characterRoster: [
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
    this.swipeCardRef = React.createRef()
    console.disableYellowBox = true
  }

  _getCardData = () => {
    var instance = this
    var tempCollectionData = {}
    const userData = this.props.navigation.getParam('userData', undefined)
    var minGSP = parseInt(userData.averageGSP) - 100000
    var maxGSP = parseInt(userData.averageGSP) + 100000
    firebase.firestore().collection('users').get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          if (instance.state.tagsSelected.length) {
            instance.state.tagsSelected.forEach(function (char) {
              var filteredArr = doc.data().listOfCharacters.filter(obj => obj.name === char.name)
              if (!tempCollectionData.hasOwnProperty(doc.id) && filteredArr.length) {
                var tmpData = doc.data()
                if (minGSP <= tmpData.averageGSP && tmpData.averageGSP <= maxGSP) {
                  tmpData.img = char.name.toLowerCase().replace(' ', '_')
                  tempCollectionData[doc.id] = tmpData
                }
              }
            })
          } else {
            if (doc.data().listOfCharacters) {
              var tmpData = doc.data()
              if (minGSP <= tmpData.averageGSP && tmpData.averageGSP <= maxGSP) {
                tmpData.img = 'roster'
                tempCollectionData[doc.id] = tmpData
              }
            }
          }
        })
        instance.setState({
          collectionData: tempCollectionData,
          cards: instance.getCards(tempCollectionData)
        })
      })
  }

  componentWillMount = () => {
    this._didFocusSubscription = this.props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    )
    this._getCardData()
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
    const userLoginData = this.props.navigation.getParam('userLoginData', undefined)
    const userData = this.props.navigation.getParam('userLoginData', undefined)
    navigate('Profile', { userLoginData: userLoginData, userData: userData })
  }

  _onFriendPress = () => {
    const { navigate } = this.props.navigation
    const userLoginData = this.props.navigation.getParam('userLoginData', undefined)
    const userData = this.props.navigation.getParam('userLoginData', undefined)
    navigate('Friend', { userLoginData: userLoginData, userData: userData })
  }

  getCards = (collectionData) => {
    var tempCards = []
    const userLoginData = this.props.navigation.getParam('userLoginData', undefined)
    for (var profile in collectionData) {
      var obj = {}
      if (collectionData[profile].playerName !== undefined &&
          collectionData[profile].age !== undefined &&
          profile !== userLoginData.user.email &&
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
    const userLoginData = this.props.navigation.getParam('userLoginData', undefined)
    const userData = this.props.navigation.getParam('userLoginData', undefined)
    navigate('TempProfile', {
      playerData: this.state.collectionData[cardData.current.state.card.email],
      userLoginData: userLoginData,
      userData: userData,
      access: 'Home'
    })
  }

  _onYup = (cardData) => {
    if (Object.keys(this.state.collectionData).length) {
      var instance = this
      const userLoginData = this.props.navigation.getParam('userLoginData', undefined)
      firebase.firestore().collection('users').doc(userLoginData.user.email.trim().toLowerCase()).get()
        .then(doc => {
          if (!doc.exists) {
            Alert.alert('Unexpected failure to obtain user data.')
          } else {
            var tempObj = {}
            const userLoginData = instance.props.navigation.getParam('userLoginData', undefined)
            tempObj.requestsSent = doc.data().requestsSent
            tempObj.requestsSent.push(cardData.current.state.card.email)
            firebase.firestore().collection('users').doc(userLoginData.user.email.trim()).update(tempObj)
          }
        })
        .catch(err => {
          Alert.alert('Error', err.message)
        })
    }
  }

  handleDelete = (index) => {
    let tagsSelected = this.state.tagsSelected
    tagsSelected.splice(index, 1)
    this.setState({ tagsSelected }, () => this._getCardData())
  }

  handleAddition = (suggestion) => {
    // Only select up to three characters
    if (this.state.tagsSelected.findIndex(x => x === suggestion) === -1) {
      if (suggestion.name === 'All Characters') {
        this.setState({ tagsSelected: [suggestion] }, () => this._getCardData())
      } else if (this.state.tagsSelected.length < 3) {
        this.setState({ tagsSelected: this.state.tagsSelected.concat([suggestion]) }, () => this._getCardData())
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
