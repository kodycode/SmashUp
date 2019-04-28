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
    backgroundColor: 'lightgreen',
    width: '100%',
    height: '40%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  DirectionContainer: {
    alignItems: 'flex-end'
  },
  directionRightButton: {
    paddingTop: 5,
    paddingRight: 5,
    paddingLeft: 5,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderTopLeftRadius: 10,
    borderColor: 'lightgray'
  },
  directionRightTextStyle: {
    fontFamily: 'gotham-medium'
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
    alignItems: 'center'
  },
  NameTextStyle: {
    fontFamily: 'gotham',
    fontSize: 15
  },
  BioContainer: {
    marginTop: 30,
    borderTopWidth: 0.5,
    borderColor: 'lightgray'
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
