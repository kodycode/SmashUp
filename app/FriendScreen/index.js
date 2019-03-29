import React from 'react'
import { Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import styles from './styles'

class FriendScreen extends React.Component {
  _onHomePress = () => {
    const { navigate } = this.props.navigation
    navigate('Home')
  }

  _getFriendList = () => {
    // Obtain JSON of friends
    return (<FlatList data={[
      { name: 'Player1', player_name: 'TBD', found_by: 'Fox' },
      { name: 'Player2', player_name: 'TBD', found_by: 'Fox' },
      { name: 'Player3', player_name: 'TBD', found_by: 'Fox' },
      { name: 'Player4', player_name: 'TBD', found_by: 'Fox' },
      { name: 'Player5', player_name: 'TBD', found_by: 'Fox' },
      { name: 'Player6', player_name: 'TBD', found_by: 'Fox' },
      { name: 'Player7', player_name: 'TBD', found_by: 'Fox' },
      { name: 'Player8', player_name: 'TBD', found_by: 'Fox' },
      { name: 'Player9', player_name: 'TBD', found_by: 'Fox' },
      { name: 'Player10', player_name: 'TBD', found_by: 'Fox' },
      { name: 'Player11', player_name: 'TBD', found_by: 'Pokemon Trainer' }
    ]}
    renderItem={({ item }) => {
      return (<View style={styles.friendBlock}>
        <View style={styles.avatarImg}>
        </View>
        <View style={{ paddingLeft: 5 }}>
          <Text style={styles.TextStyle}>Name: {item.name}</Text>
          <Text style={styles.TextStyle}>Player Name: {item.player_name}</Text>
          <Text style={styles.TextStyle}>Found By: {item.found_by}</Text>
        </View>
      </View>)
    }}
    keyExtractor={(item, index) => index.toString()}
    />)
  }

  render () {
    return (
      <View>
        <View style={styles.FriendContainer}>
          <View style={styles.DirectionContainer}>
            <TouchableOpacity onPress={this._onHomePress}>
              <Text style={styles.TextStyle}>Home</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.ScrollContainer}
            showsVerticalScrollIndicator={true}
          >
            {this._getFriendList()}
          </ScrollView>
        </View>
      </View>
    )
  }
}

module.exports = FriendScreen
