import React from 'react'
import { View } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Font } from 'expo'
import LoginScreen from './app/LoginScreen'
import HomeScreen from './app/HomeScreen'
import ProfileScreen from './app/ProfileScreen'

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen }
}, {
  initialRouteName: 'Login',
  headerMode: 'none'
})

const App = createAppContainer(MainNavigator)

export default class AppContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fontLoaded: false
    }
  }
  componentDidMount () {
    this.loadAssetsAsync()
  }

  loadAssetsAsync = async () => {
    await Font.loadAsync({
      'gotham': require('./assets/fonts/Gotham_Rounded_Bold.otf'),
      'gotham-medium': require('./assets/fonts/Gotham_Rounded_Medium.ttf')
    })
    this.setState({ fontLoaded: true })
  }
  render () {
    if (!this.state.fontLoaded) {
      return <View />
    }
    return <App />
  }
}
