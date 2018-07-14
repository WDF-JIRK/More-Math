import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import GameOver from './components/GameOver';
import PatternMesh from './components/PatternMesh';

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
  GameOver: { screen: GameOver },
  PatternMesh: { screen: PatternMesh }
});

export default App;
