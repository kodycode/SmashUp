import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import styles from './styles'

class TempProfileScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profileData: {}
    }
    console.disableYellowBox = true
  }

  componentDidMount = () => {
    this.checkProfileData()
  }

  checkProfileData = () => {
    this.setState({
      profileData: this.props.navigation.getParam('userData', undefined)
    })
  }

  _onExitButton = () => {
    const { navigate } = this.props.navigation
    navigate('Home')
  }

  render () {
    return (
      <View>
        <TouchableOpacity onPress={this._onExitButton} style={styles.exitButtonContainer}>
          <Text style={{ color: 'white' }}>Exit</Text>
        </TouchableOpacity>
        <View style={styles.ProfileContainer}>
          <View style={styles.AvatarContainer}>
            <Image source={require('../../assets/img/ico_fighter_g.png')}></Image>
          </View>
          <View style={styles.InfoContainer}>
            <View style={styles.NameContainer}>
              <Text style={styles.NameTextStyle}>{this.state.profileData.realName}, {this.state.profileData.age}</Text>
              <Text style={styles.NameTextStyle}>Player Name: {this.state.profileData.playerName}</Text>
              <Text style={styles.NameTextStyle}>List of Characters:</Text>
              <Text style={styles.NameTextStyle}>{
                this.state.profileData.listOfCharacters
                  ? this.state.profileData.listOfCharacters.map((character, i) => {
                    return i + 1 !== this.state.profileData.listOfCharacters.length ? character.name + ', ' : character.name
                  }) : null}</Text>
            </View>
            <View style={styles.BioContainer}>
              <Text style={styles.BioTextStyle}>{this.state.profileData.bio}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

module.exports = TempProfileScreen
