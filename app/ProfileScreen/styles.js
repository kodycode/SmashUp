import { StyleSheet, Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  ProfileContainer: {
    marginTop: getStatusBarHeight(),
    width: '100%',
    height: '100%'
  },
  AvatarContainer: {
    backgroundColor: 'black',
    width: '100%',
    height: '50%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  DirectionContainer: {
    alignItems: 'flex-end',
    paddingRight: 10
  },
  HomeStyle: {
    fontFamily: 'gotham-medium'
  },
  InfoContainer: {
    width: '100%',
    height: '100%'
  },
  NameContainer: {
    width: '100%',
    height: '15%',
    borderBottomWidth: 0.5,
    borderColor: 'lightgray',
    alignItems: 'center'
  },
  NameTextStyle: {
    fontFamily: 'gotham',
    fontSize: 15
  },
  BioContainer: {
    paddingTop: 10,
    paddingLeft: 10
  },
  BioTextStyle: {
    fontFamily: 'gotham-medium'
  },
  editButtonContainer: {
    position: 'absolute',
    marginLeft: width - (width / 5),
    marginTop: height - (height / 5),
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightskyblue'
  }
})

module.exports = styles