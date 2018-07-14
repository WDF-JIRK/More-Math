import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>This is a Home Screen!</Text>
        <Button
          title="gameover test"
          onPress={() => {
            navigate('GameOver');
          }}
        />
      </View>
    );
  }
}
