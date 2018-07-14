import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import GameOver from './components/GameOver';

// export default class App extends React.Component {
//   render() {
//     const { navigate } = this.props.navigation;
//     return (
//       <View style={styles.container}>
//         <Button
//           title="HomeScreen"
//           onPress={() => {
//             navigate('Home');
//           }}
//         />
//       </View>
//     );
//   }
// }

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  GameOver: { screen: GameOver }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
