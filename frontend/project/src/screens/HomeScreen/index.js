
import React from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View, Image } from 'react-native';
import users from '../../../assets/data/users'
import AnimatedStack from '../../components/AnimatedStack';
import Card from '../../components/Card/Card'



export default function HomeScreen() {

  const onSwipeLeft = (user) => {
    console.warn("swipe left", user.name)
  }

  const onSwipeRight = (user) => {
    console.warn("swipe right", user.name)
  }

  return (
    <View style={styles.container}>
      <AnimatedStack
        data={users}
        renderItem={({item}) => <Card user={item} />}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', //added this, might cause problems later
    alignItems: 'center', //added this
    flex: 1,
    backgroundColor: '#FFF',
  },
});