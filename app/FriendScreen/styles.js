import { Platform, StyleSheet, Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  FriendContainer: {
    marginTop: getStatusBarHeight(),
    width: '100%',
    height: '100%',
    flexDirection: 'column'
  },
  DirectionContainer: {
    padding: 5,
    width: '100%'
  },
  TextStyle: {
    fontFamily: 'gotham-medium'
  },
  ScrollContainer: {
    flex: 1,
    flexDirection: 'column',
    borderTopWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 50
    // marginBottom: Platform.OS === 'android' ? 50 : 0
  },
  friendBlock: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    height: '20%',
    width: width
  },
  avatarImg: {
    backgroundColor: 'black',
    height: height * 0.1,
    width: width * 0.2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  optionBox: {
    alignItems: 'center',
    width: width * 0.9,
    height: '100%'
  },
  optionBubbleStyle: {
    fontFamily: 'gotham-medium',
    fontSize: 40,
    transform: [{ rotate: '90deg' }]
  }
})

module.exports = styles
