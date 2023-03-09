import React from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View, Image, SafeAreaView} from 'react-native';
import Navigation from './src/navigation'
import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import NavigationBar from './src/components/NavigationBar';




export default function App() {

  return (
  
    <View style={styles.container}>
        <Navigation />
        {/* <NavigationBar /> */}
    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
