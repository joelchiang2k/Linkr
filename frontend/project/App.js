import React from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View, Image, SafeAreaView} from 'react-native';
import Navigation from './src/navigation'
import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import NavigationBar from './src/components/NavigationBar';
import ProfileScreen from './src/screens/ProfileScreen';
import SignInScreen from './src/screens/SignInScreen';



export default function App() {

  return (
  
    <View style={styles.container}>
        <Navigation />
    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
