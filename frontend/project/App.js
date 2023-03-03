import React from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View, Image } from 'react-native';
import Navigation from './src/navigation' 



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
