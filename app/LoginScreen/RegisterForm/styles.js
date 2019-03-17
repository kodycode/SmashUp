import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  RegisterFormContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBoxStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    padding: 5,
    width: '50%'
  },
  textMargin: {
    marginTop: 20,
    fontFamily: 'gotham'
  },
  registerButtonMargin: {
    width: '30%',
    height: '10%',
    marginTop: 40,
    borderWidth: 0.5,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  closeButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  closeButtonMargin: {
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15
  }
})

module.exports = styles
