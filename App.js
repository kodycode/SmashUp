import React from 'react'
import { View } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Font } from 'expo'
import * as firebase from 'firebase'
import LoginScreen from './app/LoginScreen'
import HomeScreen from './app/HomeScreen'
import ProfileScreen from './app/ProfileScreen'
import TempProfileScreen from './app/TempProfileScreen'
import FriendScreen from './app/FriendScreen'
import ChatWindow from './app/FriendScreen/ChatWindow'

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
  TempProfile: { screen: TempProfileScreen },
  Friend: { screen: FriendScreen },
  Chat: { screen: ChatWindow }
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
    this.initializeFirebase()
  }

  loadAssetsAsync = async () => {
    await Font.loadAsync({
      'gotham': require('./assets/fonts/Gotham_Rounded_Bold.otf'),
      'gotham-medium': require('./assets/fonts/Gotham_Rounded_Medium.ttf')
    })
    this.setState({ fontLoaded: true })
  }

  initializeFirebase = () => {
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: '<YOUR-API-KEY>',
      authDomain: '<YOUR-AUTH-DOMAIN>',
      databaseURL: '<YOUR-DATABASE-URL>',
      storageBucket: '<YOUR-STORAGE-BUCKET>'
    }

    firebase.initializeApp(firebaseConfig)
  }

  render () {
    if (!this.state.fontLoaded) {
      return <View />
    }
    return <App />
  }
}
