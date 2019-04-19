import React from 'react'
import { Alert, View, Image, Text, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
import EditForm from './EditForm'
import styles from './styles'

class ProfileScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editable: false,
      editFormVisible: false,
      userData: this.props.navigation.getParam('userData', undefined),
      profileData: {}
    }
    console.disableYellowBox = true
  }

  _onHomeButton = () => {
    const { navigate } = this.props.navigation
    navigate('Home')
  }

  _onEditButton = () => {
    this.setState({
      editFormVisible: true,
      editable: !this.state.editable
    })
  }

  componentDidMount = () => {
    this.checkProfileData()
  }

  getProfileData = () => {
    const userData = this.props.navigation.getParam('userData', undefined)
    firebase.firestore().collection('users').doc(userData.user.email.trim().toLowerCase()).get()
      .then(doc => {
        if (!doc.exists) {
          Alert.alert('Unexpected failure to obtain user data.')
        } else {
          console.log(doc.data())
          this.setState({ profileData: doc.data() })
        }
      })
      .catch(err => {
        Alert.alert('Error', err.message)
      })
  }

  setEditFormVisible = (arg) => {
    this.setState({ editFormVisible: arg })
  }

  checkProfileData = () => {
    this.getProfileData()
    if (this.state.userData.additionalUserInfo.isNewUser) {
      Alert.alert('Alert', 'Please enter your profile information before using the app.')
      this.setEditFormVisible(true)
    }
  }

  render () {
    return (
      <View>
        <EditForm
          userData={this.state.userData}
          editFormVisible={this.state.editFormVisible}
          setEditFormVisible={this.setEditFormVisible}
          checkProfileData={this.checkProfileData}/>
        <TouchableOpacity onPress={this._onEditButton} style={styles.editButtonContainer}>
          <Text style={{ color: 'white' }}>Edit</Text>
        </TouchableOpacity>
        <View style={styles.ProfileContainer}>
          <View style={styles.DirectionContainer}>
            <TouchableOpacity style={styles.directionRightButton} onPress={this._onHomeButton}>
              <Text style={styles.directionRightTextStyle}>Home</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.AvatarContainer}>
            <Image source={require('../../assets/img/ico_fighter_g.png')}></Image>
          </View>
          <View style={styles.InfoContainer}>
            <View style={styles.NameContainer}>
              <Text style={styles.NameTextStyle}>{this.state.profileData.realName}, {this.state.profileData.age}</Text>
              <Text style={styles.NameTextStyle}>Player Name: {this.state.profileData.playerName}</Text>
              <Text style={styles.NameTextStyle}>List of Characters:</Text>
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

module.exports = ProfileScreen
