import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  RegisterFormContainer: {
    flex: 1,
    flexDirection: 'column',
    width: width,
    height: height,
    marginTop: (width * 0.2)
  },
  textBoxStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    padding: 5,
    width: width * 0.5
  },
  textMargin: {
    fontFamily: 'gotham'
  },
  registerButtonMargin: {
    width: width * 0.3,
    height: height * 0.1,
    marginTop: 40,
    borderWidth: 0.5,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  closeButtonContainer: {
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
