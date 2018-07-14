import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import GameOver from './GameOver';

export default class HomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styleView}>
        <Image
          source={require('../assets/Logo.jpg')}
          style={{ width: 300, height: 100, alignSelf: 'center' }}
        />
        <Button
          title="Start Pattern Mesh"
          onPress={() => {
            navigate('PatternMesh');
          }}
        />
        <Button
          title="Start Game 2"
          onPress={() => {
            navigate('GameOver');
          }}
        />
        <Button
          title="Start Game 3"
          onPress={() => {
            navigate('GameOver');
          }}
        />
        <Button
          title="Start Game 4"
          onPress={() => {
            navigate('GameOver');
          }}
        />
      </View>
    );
  }
}

const styleView = {
  flex: 1,
  alignContent: 'center',
  alignItems: 'stretch',
  backgroundColor: 'white'
};
