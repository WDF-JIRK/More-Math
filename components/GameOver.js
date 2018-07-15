import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class GameOver extends React.Component {
  render() {
	console.log(this.props.navigation.state.params.score)
    return (
      <View>
        <Text>This is a Game Over Screen</Text>
		<Text>{this.props.navigation.state.params.score}</Text>
      </View>
    );
  }
}
