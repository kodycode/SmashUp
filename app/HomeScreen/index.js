import React from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'

import SwipeCards from 'react-native-swipe-cards'

class Card extends React.Component {
  render () {
    return (
      <View style={[styles.card, { backgroundColor: this.props.backgroundColor }]}>
        <Text style={{ color: 'white' }}>{this.props.text}</Text>
      </View>
    )
  }
}

class HomeScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cards: [
        { text: 'Swipe left/right', backgroundColor: 'salmon' },
        { text: 'Swipe left/right', backgroundColor: 'lightskyblue' },
        { text: 'Swipe left/right', backgroundColor: 'lightgreen' }
      ]
    }
    this.swipeCardRef = React.createRef()
  }

  render () {
    return (
      <View>
        <View style={styles.DirectionContainer}>
          <TouchableOpacity>
            <Text style={styles.TextStyle}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.TextStyle}>Friends</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
          <SwipeCards
            cards={this.state.cards}
            renderCard={(cardData) => <Card {...cardData} />}
            ref={this.swipeCardRef}
            loop={true}
            onClickHandler={() => {}}
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
