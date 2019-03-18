import { StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%'
  },
  DirectionContainer: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    width: '100%'
  },
  TextStyle: {
    fontFamily: 'gotham'
  },
  profileContainer: {
    backgroundColor: 'black',
    width: '100%',
    height: '80%'
  },
  buttonContainer: {
    flex: 1,
    marginTop: 30,
    flexDirection: 'row',
    backgroundColor: 'red',
    width: '100%',
    height: '100%'
  }
})

module.exports = styles
