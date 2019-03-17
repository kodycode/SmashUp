import { StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const styles = StyleSheet.create({
  ViewContainer: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    flexDirection: 'column',
    alignItems: 'center'
  },
  LoginMessageStyle: {
    textAlign: 'center',
    fontFamily: 'gotham-medium',
    fontSize: 20
  },
  SmashballContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  LoginButton: {
    width: '50%',
    height: '10%',
    backgroundColor: 'black',
    borderWidth: 0.5,
    borderColor: 'white'
  },
  LoginText: {
    color: 'white',
    fontFamily: 'gotham'
  },
  LoginImageBackgroundStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'white'
  }
})

module.exports = styles
