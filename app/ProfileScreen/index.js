import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import styles from './styles'

class ProfileScreen extends React.Component {
  _onHomeButton = () => {
    const { navigate } = this.props.navigation
    navigate('Home')
  }

  render () {
    return (
      <View>
        <TouchableOpacity style={styles.editButtonContainer}>
          <Text style={{ color: 'white' }}>Edit</Text>
        </TouchableOpacity>
        <View style={styles.ProfileContainer}>
          <View style={styles.DirectionContainer}>
            <TouchableOpacity onPress={this._onHomeButton}>
              <Text style={styles.HomeStyle}>Home</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.AvatarContainer}>
            <Image source={require('../../assets/img/ico_fighter_g.png')}></Image>
          </View>
          <View style={styles.InfoContainer}>
            <View style={styles.NameContainer}>
              <Text style={styles.NameTextStyle}>Kody, 21</Text>
              <Text style={styles.NameTextStyle}>Player Name: "Thach"</Text>
              <Text style={styles.NameTextStyle}>List of Characters:</Text>
            </View>
            <View style={styles.BioContainer}>
              <Text style={styles.BioTextStyle}>
                • Evo 20XX Champion{'\n'}
                • Genesis X Champion{'\n'}
                • Free Agent
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

module.exports = ProfileScreen
