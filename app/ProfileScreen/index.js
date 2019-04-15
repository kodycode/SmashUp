import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import EditForm from './EditForm'
import styles from './styles'

class ProfileScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editable: false,
      editFormVisible: false
    }
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

  setEditFormVisible = (arg) => {
    this.setState({ editFormVisible: arg })
  }

  render () {
    return (
      <View>
        {
          this.state.editFormVisible === true
            ? <EditForm
              editFormVisible={this.state.editFormVisible}
              setEditFormVisible={this.setEditFormVisible}
              onModalDismissed={this.onModalDismissed}/>
            : null
        }
        <TouchableOpacity onPress={this._onEditButton} style={styles.editButtonContainer}>
          <Text style={{ color: 'white' }}>
            {
              this.state.editable ? 'Done' : 'Edit'
            }
          </Text>
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
              <Text style={styles.NameTextStyle}>Kody, 21</Text>
              <Text style={styles.NameTextStyle}>Player Name: "Thach"</Text>
              <Text style={styles.NameTextStyle}>List of Characters:</Text>
            </View>
            <View style={styles.BioContainer}>
              <Text style={styles.BioTextStyle}>About me</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

module.exports = ProfileScreen
