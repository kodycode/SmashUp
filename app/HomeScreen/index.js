import React from 'react'
import { Alert, View, Text, TouchableOpacity, TouchableWithoutFeedback, BackHandler } from 'react-native'
import firebase from 'firebase'
import styles from './styles'
import SwipeCards from 'react-native-swipe-cards'

class Card extends React.Component {
  render () {
    return (
      <TouchableWithoutFeedback>
        <View style={[styles.card, { backgroundColor: 'black' }]}>
          <Text style={styles.textOverlay}>{this.props.name}, {this.props.age}</Text>
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
      cards: [
        { text: this.props.playerName, backgroundColor: 'salmon' }
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
          tempCollectionData[doc.id] = doc.data()
        })
        instance.setState({
          collectionData: tempCollectionData,
          cards: instance.getCards(tempCollectionData)
        })
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
    for (var profile in collectionData) {
      var obj = {}
      if (collectionData[profile].playerName !== undefined &&
          collectionData[profile].age !== undefined &&
          profile !== undefined) {
        obj.name = collectionData[profile].playerName
        obj.age = collectionData[profile].age
        obj.email = profile
        tempCards.push(obj)
      }
    }
    return tempCards
  }

  displayProfile = (cardData) => {
    const { navigate } = this.props.navigation
    console.log(this.state.collectionData[cardData.current.state.card.email])
    navigate('TempProfile', {
      userData: this.state.collectionData[cardData.current.state.card.email]
    })
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
          <SwipeCards
            cards={this.state.cards}
            renderCard={(cardData) => <Card {...cardData} />}
            ref={this.swipeCardRef}
            loop={true}
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
