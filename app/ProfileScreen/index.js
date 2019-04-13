import React from 'react'
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from './styles'

class ProfileScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editable: true
    }
  }

  _onHomeButton = () => {
    const { navigate } = this.props.navigation
    navigate('Home')
  }

  _onEditButton = () => {
    this.setState({
      editable: !this.state.editable
    })
  }

  render () {
    return (
      <View>
        <TouchableOpacity onPress={this.state._onEditButton} style={styles.editButtonContainer}>
          <Text style={{ color: 'white' }}>
            {
              this.state.editable ? 'Done' : 'Edit'
            }
          </Text>
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
              <TextInput editable={this.state.editable} style={styles.NameTextStyle}>Player Name: "Thach"</TextInput>
              <TextInput editable={this.state.editable} style={styles.NameTextStyle}>List of Characters:</TextInput>
            </View>
            <View style={styles.BioContainer}>
              <TextInput multiline={true} editable={this.state.editable} style={styles.BioTextStyle}>
                About me
              </TextInput>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

module.exports = ProfileScreen
